// import { PartialType } from '@nestjs/swagger';
// import { CreateSchoolDto } from './create-school.dto';

import { ApiProperty } from '@nestjs/swagger';

// export class UpdateSchoolDto extends PartialType(CreateSchoolDto) {}

export class UpdateSchoolDto {
  @ApiProperty({
    type: String,
    description: "Nom de l'ecole",
  })
  public name: string;

  @ApiProperty({
    type: String,
    description: "addresse de l'ecole",
  })
  public address: string;

  @ApiProperty({
    type: String,
    description: "Addresse email de l'ecole",
  })
  public email: string;

  @ApiProperty({
    type: String,
    description: 'Numéro de télephone de létablissement',
  })
  public phoneNumber: string;
}
