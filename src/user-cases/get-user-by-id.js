import { PostgresGetUserByIdRepository } from '../repositories/postgres/index.js'

export class GetUserByIdUserCase {
    async execute(userId) {
        const getUserByIdRepository = new PostgresGetUserByIdRepository()
        const user = await getUserByIdRepository.execute(userId)

        return user
    }
}
