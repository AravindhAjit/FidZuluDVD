let request = require("request");

const base_url = "http://localhost:3035/";

console.log("Starting test");

describe("DVD Server", () => {
    describe("GET /dvd/all/Raleigh", () => {
        it("returns response code 200", (done) => {
            request.get(base_url + "dvd/all/Raleigh", (error,response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            })
        });
        it("returns a valid body", (done) => {
            request.get(base_url+"dvd/all/Raleigh", (error, response, body) => {
                expect(body).toBeTruthy();
                expect(body).toContain("title");
                expect(body).toContain("mpaa_rating");
                expect(body).toContain("studio");
                expect(body).toContain("time");
                expect(body).toContain("price");
                done();
            });
        });
        it("contains adjusted prices", (done) => {
            request.get(base_url +"dvd/all/Raleigh", (error, response, body) => {
                console.log(body);
                var data = JSON.parse(body);
                console.log(data);
                expect(data[0].title).toContain("Avengers - Infinity War");
                expect(data[0].price).toBeGreaterThan(18.55);
                expect(data[0].price).toBeLessThan(20.00);
                done();
            });
        });
    });
    describe("GET /dvd/all/Durham", () => {
        it("returns response code 200", (done) => {
            request.get(base_url + "dvd/all/Durham", (error,response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            })
        });
        it("returns a valid body", (done) => {
            request.get(base_url+"dvd/all/Durham", (error, response, body) => {
                expect(body).toBeTruthy();
                expect(body).toContain("title");
                expect(body).toContain("mpaa_rating");
                expect(body).toContain("studio");
                expect(body).toContain("time");
                expect(body).toContain("price");
                done();
            });
        });
        it("contains adjusted prices", (done) => {
            request.get(base_url +"dvd/all/Durham", (error, response, body) => {
                var data = JSON.parse(body);
                expect(data[0].title).toContain("Avengers - Infinity War");
                expect(data[0].price).toBeGreaterThan(20.00);
                expect(data[0].price).toBeLessThan(21.00);
                done();
            });
        });
    });
    describe("GET /dvd/all/boston/", ()=>{
        //when searching for unknown location return 404
        it("returns 404", (done) => {
            request.get(base_url + 'dvd/all/boston', 
                (error, response, body) => {
                    expect(response.statusCode).toBe(404);
                    done();
            });
        });
    });
    describe("GET /dvd/team", () => {
        it("contains team info", (done) => {
            request.get(base_url + "dvd/team", (error, response, body) => {
                expect(body).toBeTruthy();
                expect(body).toContain("MediaBackend");
                done();
            });
        });
    });
});
