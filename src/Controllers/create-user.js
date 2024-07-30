import { CreateUserUseCase } from '../user-cases/create-users.js'
import validator from 'validator'
import { badRequest, created, serverError } from './helpers.js'

export class CreateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            const requireFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            for (const field of requireFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({ message: `Missing param: ${field}` })
                }
            }

            const passwordIsValid = params.password.length < 6
            if (passwordIsValid) {
                return badRequest({
                    message: `Password must be at least 6 characters`,
                })
            }

            const emailValid = validator.isEmail(params.email)
            if (!emailValid) {
                return badRequest({
                    message: `Invalid e-maail. Please provide a valid one.`,
                })
            }

            const createUserCase = new CreateUserUseCase()
            const createUser = await createUserCase.execute(params)

            return created(createUser)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
