import puppeteer from "puppeteer"
import dotenv from 'dotenv'
import {load} from 'cheerio'

dotenv.config()
import Book from "./models/Book.js";
import db from "./models/db.js";


const sleep = time => setTimeout(function () {
    console.log("beklenildi")
}, time);

const addBookToDb = async (name, img, order, price,link,author) => {
    return await Book.create({name, img, order, price,link,author})
}


const scraping = async (bookPage) => {

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.kitapyurdu.com/index.php?route=product/best_sellers&list_id=1&filter_in_stock=1&filter_in_stock=1&page=' + bookPage)
    let html = await page.evaluate(() => document.body.innerHTML)
    let $ = load(html)
    $(".product-cr").each(async (e, i) => {
        let name = $(i).find('img').attr('alt')
        let price = $(i).find('.price-new  span.value').text()
        let image = $(i).find('img').attr('src')
        let link = $(i).find('a').attr('href')
        let order = $(i).find(".bestseller-rank").text()
        let author=$(i).find(".author.compact.ellipsis").text()
        order = parseInt(order)
        price = parseFloat(price.trim().replace(',', '.'))
        await addBookToDb(name, image, order, price,link,author).then(res => {
            console.log(res.name + ' Eklendi!')
        })
    })
    return browser.close()


}


(async function (){
   await db()
    console.log('DB CONNECTED')
        for (let i = 1; i <= 25; i++) {
            await scraping(i)
        }
    process.exit()
})()
