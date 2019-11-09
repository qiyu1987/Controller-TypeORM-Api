// src/users/controller.ts
import {
	JsonController,
	Get,
	Param,
	Put,
	Body,
	Post,
	HttpCode,
	NotFoundError
} from "routing-controllers"
import User from "./entity"
// this makes sure a class is marked as controller that always returns JSON
// perfect for our REST API
@JsonController()
export default class UserController {
	// this markes a method as endpoint
	// in this case it responds to any GET /pages/:id
	// request with :id being a variable parameter

	@Get("/users/:id")
	getUser(
		// this decorator retrieves the ID parameter from the url
		@Param("id") id: number
	) {
		return User.findOne(id)
	}

	@Get("/users")
	async allUsers() {
		const users = await User.find()
		// .. implement!
		return { users: users }
	}

	@Put("/users/:id")
	async updateUser(@Param("id") id: number, @Body() update: Partial<User>) {
		const user = await User.findOne(id)
		if (!user) throw new NotFoundError("Cannot find page")

		return User.merge(user, update).save()
	}

	@Post("/users")
	@HttpCode(201)
	async createUser(@Body() user: User) {
		const { password, ...rest } = user
		const entity = User.create(rest)
		await entity.setPassword(password)
		return entity.save()
	}
}
