// src/pages/controller.ts
import { JsonController, Get, Param, Put, Body, Post, HttpCode } from 'routing-controllers'
import pagesById, { Page } from './data'
type PageList = { pages: Page[] }
// this makes sure a class is marked as controller that always returns JSON
// perfect for our REST API
@JsonController()
export default class PageController {
    // this markes a method as endpoint
    // in this case it responds to any GET /pages/:id
    // request with :id being a variable parameter
    
    @Get('/pages/:id')
    getPage(
        // this decorator retrieves the ID parameter from the url
        @Param('id') id: number
        ): Page {
            return pagesById[id]
        }
        
        @Get('/pages')
        allPages(): PageList {
            // .. implement!
            return {pages: Object.values(pagesById)}
        }
        
        @Put('/pages/:id')
        updatePage(
            @Param('id') id: number,
            @Body() body: Partial<Page>
            ): Page {
                console.log(`Incoming PUT body param:`, body)
                return pagesById[id]
            }
            
            @Post('/pages')
            @HttpCode(201)
            createPage(
                @Body() body: Page
                ): Page {
                    console.log(`Incoming POST body param:`, body)
                    return body
                }
        }
        