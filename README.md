## Nodejs (Puppeteer,Cheerio) ile modern web scraping.

kitapyurdu.com'da en çok satılan 500 kitap bilgilerini çeker ve mongodb veritabanına kaydeder.

çalıştırmadan önce 

```sh
    npm install
    cp .env.example .env
```

.env dosyasında MONGO_URI parametresini değiştirin. ardından

```sh 
    npm start
```