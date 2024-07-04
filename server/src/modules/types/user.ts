import { ApiProperty } from "@nestjs/swagger";

  
export class AddUserDto {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    email: string;
  
    @ApiProperty()
    provider: string
  }
  