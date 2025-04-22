import { Test, TestingModule } from '@nestjs/testing'

import { PrismaService } from '../prisma/prisma.service'

import { CreateFormDto } from './dto/form.dto'
import { FormService } from './form.service'

const USER_ID = '123'
const FORM_ID = '1'
const DATE = new Date()

const mockCreateFormDto: CreateFormDto = {
	fields: [
		{
			id: '1',
			label: '',
			type: 'TEXT'
		}
	],
	user_id: USER_ID
}

const mockResponse = {
	...mockCreateFormDto,
	id: FORM_ID,
	createdAt: DATE,
	updatedAt: DATE
}

const mockUserService = {
	getUserById: jest.fn().mockResolvedValue({ id: USER_ID, name: 'Test User' })
}

describe('FormService', () => {
	let service: FormService

	const mockPrismaService = {
		form: {
			findUnique: jest.fn(),
			create: jest.fn(),
			update: jest.fn()
		}
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				FormService,
				{
					provide: PrismaService,
					useValue: mockPrismaService
				},
				{
					provide: require('../user/user.service').UserService,
					useValue: mockUserService
				}
			]
		}).compile()

		service = module.get<FormService>(FormService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should return form by id', async () => {
		mockPrismaService.form.findUnique.mockResolvedValue(mockResponse)

		const result = await service.getForm(FORM_ID)
		expect(result).toEqual(mockResponse)
	})

	it('should create a form', async () => {
		mockPrismaService.form.create.mockResolvedValue(mockResponse)

		const result = await service.createForm(mockCreateFormDto, USER_ID)
		expect(mockPrismaService.form.create).toHaveBeenCalledWith({
			data: {
				userId: USER_ID,
				fields: {
					create: mockCreateFormDto.fields
				}
			}
		})

		expect(result).toEqual(mockResponse)
	})

	it('should patch form by id', async () => {
		mockPrismaService.form.update.mockResolvedValue(mockResponse)

		const request = { fields: mockCreateFormDto.fields }

		const result = await service.patchForm(FORM_ID, request)
		expect(result).toEqual(mockResponse)
	})
})
