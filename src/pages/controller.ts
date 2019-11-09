// src/pages/controller.ts
import {
	JsonController,
	Get,
	Param,
	Put,
	Body,
	Post,
	HttpCode
} from "routing-controllers"
import Page from "./entity"
// this makes sure a class is marked as controller that always returns JSON
// perfect for our REST API
@JsonController()
export default class PageController {
	// this markes a method as endpoint
	// in this case it responds to any GET /pages/:id
	// request with :id being a variable parameter

	@Get("/pages/:id")
	getPage(
		// this decorator retrieves the ID parameter from the url
		@Param("id") id: number
	) {
		return Page.findOne(id)
	}

	@Get("/pages")
	async allPages() {
		const pages = await Page.find()
		// .. implement!
		return { pages: pages }
	}

	@Put("/pages/:id")
	updatePage(@Param("id") id: number, @Body() body: Partial<Page>) {
		console.log(`Incoming PUT body param:`, body)
		return Page.findByIds([id])
	}

	@Post("/pages")
	@HttpCode(201)
	createPage(@Body() body: Page): Page {
		console.log(`Incoming POST body param:`, body)
		return body
	}
}
