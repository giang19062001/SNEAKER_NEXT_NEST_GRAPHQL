import { Injectable } from '@nestjs/common';
import * as paypal from 'paypal-rest-sdk';
import { cartPayPal, cartPayPalList, CreateOrderDto, ExecuteOrderDto } from 'src/modules/types/order';
import { Order } from '../schemas/order.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PaypalService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {
    paypal.configure({
      mode: 'sandbox', // Change to 'live' for production
      client_id:
        'AVFJX07iQE642vSCxZO52zWp70ChAmH7wzOFoeC43ah_RUYw1SdvOgPKmsbF54sPcIPAHwNUdEewu2Nh',
      client_secret:
        'EEzYdzaCT3JwvWJPWb77rHYHeMXrhBII1QW06X5lFZZm1aK9AvBdiaurKGhSnc0URXGH4W_UxUq58905',
    });
  }
  async createOrder(createOrderDto: CreateOrderDto) {
    console.log('createOrderDto', createOrderDto);
    let cartPaypal: cartPayPalList = createOrderDto.cart.map((dto: any) => {
      return {
        name: dto.name,
        price: dto.price,
        quantity: dto.quantity,
        currency: 'USD',
      };
    });
    cartPaypal.push({
      name: 'SHIP',
      price: createOrderDto.ship,
      quantity: 1,
      currency: 'USD',
    });
    //ADD FAKE PRODUCT IS SHIP BECAUSE PAYPAL DON'T UNDERSTAND SHIP MONEY
    console.log('cartPaypal', cartPaypal);
    const total = (
      parseFloat(createOrderDto.amount) + parseFloat(createOrderDto.ship)
    )
      .toFixed(2)
      .toString();
    console.log('total', total);
    //SAVE TO DB
    return new Promise((resolve, reject) => {
      const create_payment_json = {
        intent: 'sale',
        payer: {
          payment_method: 'paypal',
        },
        redirect_urls: {
          return_url: 'http://localhost:5000/order/success',  //CUSTOM
          cancel_url: 'http://localhost:5000/order/cancel', //CUSTOM
        },
        transactions: [
          {
            item_list: {
              items: cartPaypal,
            },
            amount: {
              currency: 'USD',
              total: total,
            },
            description: 'This is the payment description.',
          },
        ],
      };

      console.log('create_payment_json', create_payment_json);
      paypal.payment.create(create_payment_json, (error, payment) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          const approvalUrl = payment.links.find(
            (link) => link.rel === 'approval_url',
          ).href;

          const orderPaypalID = approvalUrl.substr(
            approvalUrl.indexOf('token=') + 6,
            approvalUrl.length,
          );

          //SAVE ORDER TO MONGO
          const newOrder = new this.orderModel({
            ...createOrderDto,
            orderPaypalID: orderPaypalID,
          });
          newOrder.save();
          resolve(orderPaypalID);
        }
      });
    });
  }
  async executePayment(executeOrderDto: ExecuteOrderDto) {
    console.log('executeOrderDto', executeOrderDto);

    const { paymentID, payerID, orderPaypalID } = executeOrderDto;
    const executePaymentRequest = {
      payer_id: payerID,
    };
    return new Promise((resolve, reject) => {
      paypal.payment.execute(
        paymentID,
        executePaymentRequest,
        async (error, payment) => {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            //UPDATE STATUS APPROVE TO ORDER ON MONGO
            await this.orderModel.findOneAndUpdate({orderPaypalID: orderPaypalID}, { $set: {approve : true}})
            resolve(payment);
          }
        },
      );
    });
  }
}

//sb-iu6z620768780@business.example.com
//Rlqv-8K3

//sb-9boco20779154@personal.example.com
///_R5lBWt
