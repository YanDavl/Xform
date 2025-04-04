import { ApiProperty } from '@nestjs/swagger'
import { FieldType } from '@prisma/__generated__'

export class CreateFieldDto {
	@ApiProperty({
		enum: FieldType,
		description: 'Тип поля',
		example: FieldType.TEXT
	})
	type: FieldType

	@ApiProperty({ type: String, description: 'Название поля' })
	label: string
}

export class CreateFormDto {
	@ApiProperty({ type: [CreateFieldDto], description: 'Поля формы' })
	fields: CreateFieldDto[]
}
