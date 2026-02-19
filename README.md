# Property-Rental-Platform
The Property Rental Platform is a web application designed to simplify the process of listing, searching, and managing rental properties. Whether you’re a landlord looking to list properties or a tenant searching for the perfect home, this platform offers an intuitive and efficient experience.

Features:<br/>
- **User Authentication:** Secure signup and login functionality for landlords and tenants.
- **Images and Maps:** Images and location can be added with msp facilities.
- **Property Listings:** Landlords can add, edit, and manage property listings with images and detailed descriptions.
- **Review and Rating:** Tenants and give ratings upto 5 stars and write the review of the property.
- **Comments:** Tenants can write comments about their experience.

🧰 Tech Stack-<br/>

**BACKEND:** <br/>
- **Node.js –** JavaScript runtime for the server
- **Express.js –** Web framework for routing and middleware
- **MongoDB –** NoSQL database (connected via mongoose)
- **Mongoose –** ODM for MongoDB
- **EJS –** Templating engine for server-side HTML rendering
- **Passport.js –** Authentication framework (with passport-local)
- **connect-mongo –** Store sessions in MongoDB
- **express-session –** Session management
- **connect-flash –** Flash messages for success/error notifications
- **method-override –** Support PUT and DELETE via forms
  
**FRONTEND:** <br/>
- **HTML, CSS,Javascript, EJS templates –** Server-rendered pages
  
**DEPLOYMENT:** <br/>
- Local development runs on Node.js + Express
- MongoDB can be local (mongodb://127.0.0.1:27017/wanderlust) or Atlas (process.env.ATLASDB_URL)


Steps to Run Locally-<br/>
1️⃣ Clone the Repository<br/>
```
git clone https://github.com/Harshitajain10/Property-Rental-Platform.git
cd Property-Rental-Platform
```
2️⃣ Install Dependencies<br/>
Make sure you are in the project root directory and run:<br/>
```
npm install
```
3️⃣ Setup Environment Variables<br/>
Create a .env file in the root folder with the following variables:<br/>
```
ATLASDB_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/wanderlust?retryWrites=true&w=majority
SECRET=your-session-secret
MAP_TOKEN=your-map-api-key
```
5️⃣ Start the Server<br/>
Run the project:<br/>
```
node app.js
```
Website Link:https://property-rental-platform-tr2b.onrender.com
