// src/pages/controller.ts
import { JsonController, Get, Param } from 'routing-controllers'
import pagesById, { Page } from './data'
// this makes sure a class is marked as controller that always returns JSON
// perfect for our REST API
@JsonController()
// this markes a method as endpoint
// in this case it responds to any GET /pages/:id
// request with :id being a variable parameter
export default class PageController {

    @Get('/pages/:id')
    getPage(
        // this decorator retrieves the ID parameter from the url
        @Param('id') id: number
    ): Page {
        return pagesById[id]
    }
}