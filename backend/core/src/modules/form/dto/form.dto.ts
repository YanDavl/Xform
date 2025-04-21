import { ApiProperty } from '@nestjs/swagger'
import { FieldType } from '@prisma/__generated__'

export type Field = {
	id: string
	label: string
	type: FieldType
}

export class CreateFormDto {
	user_id: string
	@ApiProperty({ description: 'Поля формы' })
	fields: Field[]
}
