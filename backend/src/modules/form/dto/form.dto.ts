import { ApiProperty } from '@nestjs/swagger'
import { Field, FieldType } from '@prisma/__generated__'

class FieldDto implements Field {
	@ApiProperty({ type: 'string', format: 'uuid' })
	id: string

	@ApiProperty({ type: 'string', description: 'Название поля' })
	label: string

	formId: string

	@ApiProperty()
	type: FieldType
}

export class CreateFormDto {
	user_id: string
	@ApiProperty({ type: [FieldDto], description: 'Поля формы' })
	fields: Field[]
}
