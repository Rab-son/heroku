// importing libraries
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');


//creating an express application
const app = express();
const PORT = 8000;

//models
const user = require('./model/user');// for saving user details
const illegalDumping = require('./model/illegalDumping');// for reporting illegal Dumping
const search = require('./model/user');// for query user items
const userDetails = require('./model/user');//for getting user details 
const userAccount = require('./model/user');// for diplaying user details
const sendInstitution = require('./model/wasteinstitution');// for querying and sending trash requests
const userAccountUpdate = require('./model/user');// for updating use details
const sendTrashRequest = require('./model/trashcollection');// for ending trash requests
const sortedWaste = require('./model/sortedWaste');// for getting sort waste
const getRating = require('./model/review');// for sending reviews
const getNotification = require('./model/notificationTrashCollection');
const getSortedNotification = require('./model/notificationSortedWaste');
//MongoDB Connection
const database_url =  'mongodb+srv://evas:eva12345@cluster0.qh7d4.mongodb.net/mgmt-test?retryWrites=true&w=majority'
//const database_url =  'mongodb://127.0.0.1:27017/ussd'
mongoose.connect(database_url);
const db = mongoose.connection;

//Checking Database Connection
db.on('error', (err)=>{
    console.log(err)
})
db.once('open',()=>{
    console.log('Database is running')
})

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/', (req, res)=>{
    res.send('Success Message')
})


app.post('/',(req, res) => {
    const {phoneNumber, text, sessionId} = req.body;

    let response;
    let userResponse = text;

        
    let length = text.split('*').length;
    let txt = text.split('*');
    let reply = text.split(/[0-9]\*0|\*0|\*/g).filter(x => x);
    

    let checkNumber = user.find({},{"phoneNumber": 1}).limit(1);

    
    user.findOne({
        $or: [{
            phoneNumber: req.body.phoneNumber
        }, {
            phoneNumber: req.body.phoneNumber
        }]
    }).then(user => {
        if (user) {
            if (user.phoneNumber !== req.body.phoneNumber) {
            } else {
 /*******************************************  MAIN MENU IMPLEMENTATION ( 1 and 2 levels)  ****************************************/       
    if(user.language === 'english' && user.blocked === false){
        // Main Menu
        if (reply.length == 0) {

            // This is the first request. Note how we start the response with CON
            response = `CON Waste Management System
                Choose Your Desired Option
                1. Request Trash Collection
                2. Report Illegal Dumping
                3. Review
                4. Report Sorted Waste
                5. My Account
                6. Help`;
          }
        // Request Trash Collection Menu
        else if (reply.length == 1 && reply[0] === '1'){
            // Business logic for first level response
            response = `CON Waste Management System
                Request Trash Collection
                1. Enter Amount of Waste
                2. Phone Numbers
                3. Notifications
                0. Back`;
        } 
        // Report Illegal Dumping Menu
        else if (reply.length == 1 && reply[0] === '2'){
            // Business logic second level reponse
            response = `CON Waste Management System
                Report illegal Dumping
                1. Enter Location Name
                2. Phone Numbers
                0. Back`;
                
        }
        // Review An Area Menu
        else if (reply.length == 1 && reply[0] === '3'){
            // Business logic third level reponse
            response = `CON Waste Management System
                Review An Institution
                1. Choose Institution 
                2. Phone Numbers
                0. Back`;

        }
        // Record Sorted Waste Menu
        else if (reply.length == 1 && reply[0] === '4'){
            // Business logic fourth level reponse
            response = `CON Waste Management System
                Report Sorted Waste
                1. Enter Sorted Waste
                2. Phone Numbers
                3. Notification
                0. Back`;
        }
        // Account Menu
        else if (reply.length == 1 && reply[0] === '5'){
            // Business logic for fifth level response
            response = `CON Waste Management System
                Check Account Details
                1. Check Account Details
                2. Change Account Details
                0. Back`;
        }

        // Help Menu
        else if (reply.length == 1 && reply[0] === '6'){
            // Business logic for fifth level response
            sendInstitution.find({}, (err, wasteinstitution)=>{
 
                let institution_data = `${
                    wasteinstitution.length < 1 ? `No data found`
                    : 
                    `${wasteinstitution.map((item, index)=>{
                       return `${item._id = index+1}. ${item.name}
                               ${item.phoneNumber}\n`
                                    
                    }
                    ).join("")}`
                }`
                response = `END Help Center. \n${institution_data}`  
            })
        }
        

/*******************************************  END OF MAIN MENU IMPLEMENTATIONS ( 1 and 2 levels)  ****************************************/       


/*******************************************  REQUEST TRASH COLLECTION MENU - ALL SUBMENUS IMPLEMENTATIONS   ****************************************/  
        // Request Trash Collection Menu
        else if (userResponse === "1*1"){
            // Business logic for first level response
            response = `CON Waste Management System
                        Request Trash Collection
                        Amount of Trash (e.g 10Kgs)`;
        } 
        
        else if (userResponse === "1*2"){
            sendInstitution.find({}, (err, wasteinstitution)=>{
                let institution_data = `${
                    wasteinstitution.length < 1 ? `No data found`
                    : 
                    `${wasteinstitution.map((item, index)=>{
                       return `${item._id = index+1}. ${item.name}
                               ${item.phoneNumber}\n`
                                    
                    }
                    ).join("")}`
                }`
                response = `END Request Trash Collection. \n${institution_data}`  
            })
        }

        else if (userResponse === "1*3"){
            // Business logic for first level response
            getNotification.find({}, (err, notificationTrashCollection)=>{
                let notification_data = `${
                    notificationTrashCollection.length < 1 ? `No data found`
                    : 
                    `${notificationTrashCollection.map((item)=>{
                        if(item.creator = user._id && item.completed === false){
                            return `Pending`
                        }else {
                            return `Completed`
                        }                                    
                    }
                    ).join("")}`
                }`
                response = `END Request Trash Collection. \n${notification_data}`  
            }).limit(1)
        } 

        else if (length === 3 && txt[0] === '1'){
            // Business logic for first level response
            response = `CON Waste Management System
                        Request Trash Collection
                        Choose Waste Type
                        1. Plastic Bottles
                        2. Rubber Waste
                        3. Glass Waste
                        4. Thin Plastics
                        5. Recyclable Cans
                        6. Other Waste`;
        } 


        else if (length === 4 && txt[0] === '1'){
            // Business logic for first level response
            sendInstitution.find({}, (err, wasteinstitution)=>{
                let institution_data = `${
                    wasteinstitution.length < 1 ? `No data found`
                    : 
                    `${wasteinstitution.map((item, index)=>{
                       return `${item._id = index+1}. ${item.name}
                               ${item.phoneNumber}\n`
                                    
                    }
                    ).join("")}`
                }`
                response = `CON Request Trash Collection. \n${institution_data}`  
            })
        } 

        else if (length === 5 && txt[0] === '1'){
            // Business logic 
            let array = text.split('*');
            // Business logic for first level response
            if(parseInt(array[3]) === 1 ){
                let userRequest = text.split('*');
                let WIListKey = Number(text.split("*").pop()) - 1;
                sendInstitution.find({}, async (err, wasteinstitutions)=>{
                    if(wasteinstitutions.length < 1){
                        return "No data found"
                    }
                    const  wilist = wasteinstitutions.map(({_id}) => _id)
                    const wiID = wilist[`${WIListKey}`]
                    const wasteinstitution = await sendInstitution.findById(wiID)
                    
                    let data = new sendTrashRequest();
                    data.location = user.location;
                    data.amount   = userRequest[2];
                    data.latitude = 0;
                    data.longitude = 0;
                    data.body = "Trash Collection";
                    data.typeOfWaste = "Plastic Bottles";
                    data.institution = wasteinstitution._id;
                    data.creator = user._id;
                    data.createdAt = new Date().toISOString();
                    data.save(()=>{
                        response = `END Waste Management System
                        Request Trash Collection
                        Location            : ${user.location} 
                        Waste Type          :  Plastic Bottles  
                        Amount of Waste     : ${userRequest[2]} 
                        Waste Institution   : ${wasteinstitution.name}
                        Your Number         : ${phoneNumber}`
                    })

                    let notificationData = new getNotification();
                    notificationData.completed = false;
                    notificationData.status = "pending";
                    notificationData.trashcollection = data._id;
                    notificationData.institution = wasteinstitution._id;
                    notificationData.creator = user._id;
                    notificationData.createdAt = new Date().toISOString();
                    notificationData.save();

                    await userAccount.updateOne({_id: user._id}, 
                        { $push: {trashCollectionNofications: data._id} });

                    await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                        { $push: {trashCollections: data._id} });
        
                })

            }
            else if(parseInt(array[3]) === 2 ){
                let userRequest = text.split('*');
                let WIListKey = Number(text.split("*").pop()) - 1;
                sendInstitution.find({}, async (err, wasteinstitutions)=>{
                    if(wasteinstitutions.length < 1){
                        return "No data found"
                    }
                    const  wilist = wasteinstitutions.map(({_id}) => _id)
                    const wiID = wilist[`${WIListKey}`]
                    const wasteinstitution = await sendInstitution.findById(wiID)
                    
                    let data = new sendTrashRequest();
                    data.location = user.location;
                    data.amount   = userRequest[2];
                    data.latitude = 0;
                    data.longitude = 0;
                    data.body = "Trash Collection";
                    data.typeOfWaste = "Rubber Waste";
                    data.institution = wasteinstitution._id;
                    data.creator = user._id;
                    data.createdAt = new Date().toISOString();
                    data.save(()=>{
                        response = `END Waste Management System
                        Request Trash Collection
                        Location            : ${user.location} 
                        Waste Type          :  Rubber Waste  
                        Amount of Waste     : ${userRequest[2]} 
                        Waste Institution   : ${wasteinstitution.name}
                        Your Number         : ${phoneNumber}`
                    })

                    let notificationData = new getNotification();
                    notificationData.completed = false;
                    notificationData.status = "pending";
                    notificationData.trashcollection = data._id;
                    notificationData.institution = wasteinstitution._id;
                    notificationData.creator = user._id;
                    notificationData.createdAt = new Date().toISOString();
                    notificationData.save();

                    await userAccount.updateOne({_id: user._id}, 
                        { $push: {trashCollectionNofications: data._id} });

                    await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                        { $push: {trashCollections: data._id} });


                })
                

            }
            else if(parseInt(array[3]) === 3 ){
                let userRequest = text.split('*');
                let WIListKey = Number(text.split("*").pop()) - 1;
                sendInstitution.find({}, async (err, wasteinstitutions)=>{
                    if(wasteinstitutions.length < 1){
                        return "No data found"
                    }
                    const  wilist = wasteinstitutions.map(({_id}) => _id)
                    const wiID = wilist[`${WIListKey}`]
                    const wasteinstitution = await sendInstitution.findById(wiID)
                    

                    let data = new sendTrashRequest();
                    data.location = user.location;
                    data.amount   = userRequest[2];
                    data.latitude = 0;
                    data.longitude = 0;
                    data.body = "Trash Collection";
                    data.typeOfWaste ="Glass Waste";
                    data.institution = wasteinstitution._id;
                    data.creator = user._id;
                    data.createdAt = new Date().toISOString();
                    data.save(()=>{
                        response = `END Waste Management System
                        Request Trash Collection
                        Location            : ${user.location} 
                        Waste Type          :  Rubber Waste  
                        Amount of Waste     : ${userRequest[2]} 
                        Waste Institution   : ${wasteinstitution.name}
                        Your Number         : ${phoneNumber}`
                    })

                    let notificationData = new getNotification();
                    notificationData.completed = false;
                    notificationData.status = "pending";
                    notificationData.trashcollection = data._id;
                    notificationData.institution = wasteinstitution._id;
                    notificationData.creator = user._id;
                    notificationData.createdAt = new Date().toISOString();
                    notificationData.save();

                    await userAccount.updateOne({_id: user._id}, 
                        { $push: {trashCollectionNofications: data._id} });

                    await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                        { $push: {trashCollections: data._id} });
                })
            }
            else if(parseInt(array[3]) === 4 ){
                let userRequest = text.split('*');
                let WIListKey = Number(text.split("*").pop()) - 1;
                sendInstitution.find({}, async (err, wasteinstitutions)=>{
                    if(wasteinstitutions.length < 1){
                        return "No data found"
                    }
                    const  wilist = wasteinstitutions.map(({_id}) => _id)
                    const wiID = wilist[`${WIListKey}`]
                    const wasteinstitution = await sendInstitution.findById(wiID)
                    
                    let data = new sendTrashRequest();
                    data.location = user.location;
                    data.amount   = userRequest[2];
                    data.latitude = 0;
                    data.longitude = 0;
                    data.body = "Trash Collection";
                    data.typeOfWaste = "Thin Plastics";
                    data.institution = wasteinstitution._id;
                    data.creator = user._id;
                    data.createdAt = new Date().toISOString();
                    data.save(()=>{
                        response = `END Waste Management System
                        Request Trash Collection
                        Location            : ${user.location} 
                        Waste Type          :  Thin Plastics 
                        Amount of Waste     : ${userRequest[2]} 
                        Waste Institution   : ${wasteinstitution.name}
                        Your Number         : ${phoneNumber}`
                    })

                    let notificationData = new getNotification();
                    notificationData.completed = false;
                    notificationData.status = "pending";
                    notificationData.trashcollection = data._id;
                    notificationData.institution = wasteinstitution._id;
                    notificationData.creator = user._id;
                    notificationData.createdAt = new Date().toISOString();
                    notificationData.save();

                    await userAccount.updateOne({_id: user._id}, 
                        { $push: {trashCollectionNofications: data._id} });

                    await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                        { $push: {trashCollections: data._id} });
                })
                

            }
            else if(parseInt(array[3]) === 5 ){
                let userRequest = text.split('*');
                let WIListKey = Number(text.split("*").pop()) - 1;
                sendInstitution.find({}, async (err, wasteinstitutions)=>{
                    if(wasteinstitutions.length < 1){
                        return "No data found"
                    }
                    const  wilist = wasteinstitutions.map(({_id}) => _id)
                    const wiID = wilist[`${WIListKey}`]
                    const wasteinstitution = await sendInstitution.findById(wiID)
                    
                    let data = new sendTrashRequest();
                    data.location = user.location;
                    data.amount   = userRequest[2];
                    data.latitude = 0;
                    data.longitude = 0;
                    data.body = "Trash Collection";
                    data.typeOfWaste = "Recyclable Cans";
                    data.institution = wasteinstitution._id;
                    data.creator = user._id;
                    data.createdAt = new Date().toISOString();
                    data.save(()=>{
                        response = `END Waste Management System
                        Request Trash Collection
                        Location            : ${user.location} 
                        Waste Type          :  Recyclable Cans
                        Amount of Waste     : ${userRequest[2]} 
                        Waste Institution   : ${wasteinstitution.name}
                        Your Number         : ${phoneNumber}`
                    })

                    let notificationData = new getNotification();
                    notificationData.completed = false;
                    notificationData.status = "pending";
                    notificationData.trashcollection = data._id;
                    notificationData.institution = wasteinstitution._id;
                    notificationData.creator = user._id;
                    notificationData.createdAt = new Date().toISOString();
                    notificationData.save();

                    await userAccount.updateOne({_id: user._id}, 
                        { $push: {trashCollectionNofications: data._id} });

                    await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                        { $push: {trashCollections: data._id} });
                })
                

            }
            else if(parseInt(array[3]) === 6 ){
                 response = `CON Waste Management System
                             Request Trash Collection
                             Enter name of waste (e.g Cans)`;
            }
        }
        
        else if (length === 6 && txt[0] === '1'){
            let userRequest = text.split('*');
            //let WIListKey = Number(text.split("*").pop()) - 1;
            let WIListKey = Number(userRequest[4]) - 1;
            sendInstitution.find({}, async (err, wasteinstitutions)=>{
                if(wasteinstitutions.length < 1){
                    return "No data found"
                }
                const  wilist = wasteinstitutions.map(({_id}) => _id)
                const wiID = wilist[`${WIListKey}`]
                const wasteinstitution = await sendInstitution.findById(wiID)

                let data = new sendTrashRequest();
                data.location = user.location;
                data.amount   = userRequest[2];
                data.latitude = 0;
                data.longitude = 0;
                data.body = "Trash Collection";
                data.typeOfWaste = userRequest[5];
                data.institution = wasteinstitution._id;
                data.creator = user._id;
                data.createdAt = new Date().toISOString();
                data.save(()=>{
                    response = `END Waste Management System
                    Request Trash Collection
                    Location            : ${user.location} 
                    Waste Type          : ${userRequest[5]} 
                    Amount of Waste     : ${userRequest[2]} 
                    Waste Institution   : ${wasteinstitution.name}
                    Your Number         : ${phoneNumber}`
                })

                let notificationData = new getNotification();
                notificationData.completed = false;
                notificationData.status = "pending";
                notificationData.trashcollection = data._id;
                notificationData.institution = wasteinstitution._id;
                notificationData.creator = user._id;
                notificationData.createdAt = new Date().toISOString();
                notificationData.save();

                await userAccount.updateOne({_id: user._id}, 
                    { $push: {trashCollectionNofications: data._id} });

                await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                    { $push: {trashCollections: data._id} });
            })
        }    
        
        
/*******************************************  END REQUEST TRASH - ALL SUBMENUS IMPLEMENTATIONS  ****************************************/


/*******************************************  REPORT ILLEGAL Dumping MENU - ALL SUBMENUS IMPLEMENTATIONS   ****************************************/  
        // Report Illegal Dumping Menu
        else if (userResponse === "2*1"){
            // Business logic 
            response = `CON Waste Management System
                 Report Illegal Dumping
                 Location of illegal Dumping`;
        }

        else if (length === 3 && txt[0] === '2'){
            // Business logic 
            response = `CON Waste Management System
                        Report Illegal Dumping
                        Comment`;
        }

        else if (userResponse === "2*2"){
            // Business logic for second level response
            sendInstitution.find({}, (err, wasteinstitution)=>{
                let institution_data = `${
                    wasteinstitution.length < 1 ? `No data found`
                    : 
                    `${wasteinstitution.map((item, index)=>{
                       return `${item._id = index+1}. ${item.name}
                               ${item.phoneNumber}\n`
                                    
                    }
                    ).join("")}`
                }`
                response = `END Report Illegal Dumping \n${institution_data}`  
            })  
        }
        else if (length === 4 && txt[0] === '2'){
            // Business logic for second level response
            sendInstitution.find({}, (err, wasteinstitution)=>{
                let institution_data = `${
                    wasteinstitution.length < 1 ? `No data found`
                    : 
                    `${wasteinstitution.map((item, index)=>{
                       return `${item._id = index+1}. ${item.name}
                               ${item.phoneNumber}\n`
                                    
                    }
                    ).join("")}`
                }`
                response = `CON Report Illegal Dumping \n${institution_data}`  
            })  
        }

        else if (length === 5 && txt[0] === '2'){
            let userRequest = text.split('*');
            let WIListKey = Number(text.split("*").pop()) - 1;
            sendInstitution.find({}, async (err, wasteinstitutions)=>{
                if(wasteinstitutions.length < 1){
                    return "No data found"
                }
                const  wilist = wasteinstitutions.map(({_id}) => _id)
                const wiID = wilist[`${WIListKey}`]
                const wasteinstitution = await sendInstitution.findById(wiID)

                let data = new illegalDumping();
                data.location = userRequest[2];
                data.institution = wasteinstitution._id;
                data.comment = userRequest[3];
                data.latitude = 0;
                data.longitude = 0;
                data.creator = user._id;
                data.createdAt = new Date().toISOString();
                data.save(()=>{
                    response = `END Waste Management System
                    Request Trash Collection
                    Location            : ${userRequest[2]} 
                    Comment             : ${userRequest[3]}
                    Waste Institution   : ${wasteinstitution.name}
                    Your Number         : ${phoneNumber}`
                })
                await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                    { $push: {illegalDumpings: data._id} });
            })



        }
/*******************************************  END REPORT ILLEGAL DUMPING - ALL SUBMENUS IMPLEMENTATIONS  ****************************************/

/*******************************************  REVIEW AN AREA MENU - ALL SUBMENUS IMPLEMENTATIONS   ****************************************/  
        // Report Illegal Dumping Menu
        else if (userResponse === "3*1"){
            // Business logic 
            sendInstitution.find({}, (err, wasteinstitution)=>{
                let institution_data = `${
                    wasteinstitution.length < 1 ? `No data found`
                    : 
                    `${wasteinstitution.map((item, index)=>{
                       return `${item._id = index+1}. ${item.name}
                               ${item.phoneNumber}\n`
                                    
                    }
                    ).join("")}`
                }`
                response = `CON Choose A Company To Review \n${institution_data}`  
            })
        }

        else if (userResponse === "3*2"){
            // Business logic for second level response
            sendInstitution.find({}, (err, wasteinstitution)=>{
                let institution_data = `${
                    wasteinstitution.length < 1 ? `No data found`
                    : 
                    `${wasteinstitution.map((item, index)=>{
                       return `${item._id = index+1}. ${item.name}
                               ${item.phoneNumber}\n`
                                    
                    }
                    ).join("")}`
                }`
                response = `END Review A Company. \n${institution_data}`  
            })
            
        }


        else if (length === 3 && txt[0] === '3'){
            // Business logic 
            response = `CON Waste Management System
                 Review An Insitution
                 Give Rating (Choose Numbers 0 - 5 e.g 0, 1.5)`;
        }

        else if (length === 4 && txt[0] === '3'){
            // Business logic 
            response = `CON Waste Management System
                 Review An Institution
                 Comment (Why Are You Rating the area)`;
        }

        else if (length === 5 && txt[0] === '3'){
            let array = text.split('*');
            let WIListKey = Number(array[2]);
            console.log(WIListKey);
            sendInstitution.find({}, async (err, wasteinstitutions)=>{
                if(wasteinstitutions.length < 1){
                    return "No data found"
                }
                const  wilist = wasteinstitutions.map(({_id}) => _id)
                const wiID = wilist[`${WIListKey}`]
                const wasteinstitution = await sendInstitution.findById(wiID)
                if(array[3] >= 0 && array[3] <= 5){
                let data = new getRating();
                data.comment = array[4];
                data.rating = array[3];
                data.institution = wasteinstitution._id;
                console.log(wasteinstitution._id);
                data.creator = user._id;
                data.createdAt = new Date().toISOString();
                data.save(()=>{
                    response = `END Waste Management System
                    Request Trash Collection
                    Comment             : ${array[4]}
                    Rating              : ${array[3]}
                    Waste Institution   : ${wasteinstitution.name}
                    Your Number         : ${phoneNumber}`
                })
                await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                    { $push: {reviews: data._id} });

               }else if(array[3] < 0){

                let data = new getRating();
                data.comment = array[4];
                data.rating = "0";
                data.institution = wasteinstitution._id;
                data.creator = user._id;
                data.createdAt = new Date().toISOString();
                data.save(()=>{
                    response = `END Waste Management System
                    Request Trash Collection
                    Comment             : ${array[4]}
                    Rating              : 0
                    Waste Institution   : ${wasteinstitution.name}
                    Your Number         : ${phoneNumber}`
                })
                await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                    { $push: {reviews: data._id} });

               }else if(array[3] > 5){
                let data = new getRating();
                data.comment = array[4];
                data.rating = "5";
                data.institution = wasteinstitution._id;
                data.creator = user._id;
                data.createdAt = new Date().toISOString();
                data.save(()=>{
                    response = `END Waste Management System
                    Request Trash Collection
                    Comment             : ${array[4]}
                    Rating              : 5
                    Waste Institution   : ${wasteinstitution.name}
                    Your Number         : ${phoneNumber}`
                })
                await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                    { $push: {reviews: data._id} });
               }else {
                response = `END Waste Management System
                            Something Went Wrong`;
               }

            })
        }
/*******************************************  END REVIEW AN AREA - ALL SUBMENUS IMPLEMENTATIONS  ****************************************/

/*******************************************  RECORD SORTED WASTE - ALL SUBMENUS IMPLEMENTATIONS   ****************************************/  
        // Report Illegal Dumping Menu
        else if (userResponse === "4*1"){
            let array = text.split('*');
            // Business logic 
            response = `CON Waste Management System
                        Enter Amount of Sorted Waste (e.g 10Kg)`;
                
        }
        
        
        else if (userResponse === "4*2"){
            // Business logic for second level response
            sendInstitution.find({}, (err, wasteinstitution)=>{
                let institution_data = `${
                    wasteinstitution.length < 1 ? `No data found`
                    : 
                    `${wasteinstitution.map((item, index)=>{
                       return `${item._id = index+1}. ${item.name}
                               ${item.phoneNumber}\n`
                                    
                    }
                    ).join("")}`
                }`
                response = `END Get Phone Number. \n${institution_data}`  
            })        
        }

        else if (userResponse === "4*3"){
            // Business logic for first level response
            getSortedNotification.find({}, (err, notificationSortedWaste)=>{
                let notification_data = `${
                    notificationSortedWaste.length < 1 ? `No data found`
                    : 
                    `${notificationSortedWaste.map((item)=>{
                        if(item.creator = user._id && item.completed === false){
                            return `Still Pending  ${item.createdAt}`
                        }else {
                            return `Accepted ${item.createdAt}`
                        }                                    
                    }
                    ).join("")}`
                }`
                response = `END Sorted Waste. \n${notification_data}`  
            }).limit(2)
        } 

        else if (length === 3 && txt[0] === '4'){
            // Business logic for second level response
            response = `CON Waste Management System
                        Selling Price of Sorted Waste (e.g K100)`;
           
        }

        else if (length === 4 && txt[0] === '4'){
        
            sendInstitution.find({}, (err, wasteinstitution)=>{
                let institution_data = `${
                    wasteinstitution.length < 1 ? `No data found`
                    : 
                    `${wasteinstitution.map((item, index)=>{
                       return `${item._id = index+1}. ${item.name}
                               ${item.phoneNumber}\n`
                    }
                    ).join("")}`
                }`
                response = `CON Report Sorted Waste \n${institution_data}`  
            })
        }

        else if (length === 5 && txt[0] === '4'){
            // Business logic for first level response
            response = `CON Waste Management System
                        Choose Waste Type
                        1. Plastic Bottles
                        2. Rubber Waste
                        3. Glass Waste
                        4. Thin Plastics
                        5. Recyclable Cans
                        6. Other Waste`;
        } 

        else if (length === 6 && txt[0] === '4'){
            let array = text.split('*');
            // Business logic for first level response
            if(parseInt(array[5]) === 1 ){
                let userRequest = text.split('*');
                let WIListKey = Number(text.split("*").pop()) - 1;
                sendInstitution.find({}, async (err, wasteinstitutions)=>{
                    if(wasteinstitutions.length < 1){
                        return "No data found"
                    }
                    const  wilist = wasteinstitutions.map(({_id}) => _id)
                    const wiID = wilist[`${WIListKey}`]
                    const wasteinstitution = await sendInstitution.findById(wiID)
                 
                    let data = new sortedWaste();
                    data.location = user.location;
                    data.amount   = userRequest[2];
                    data.institution = wasteinstitution._id;
                    data.price = userRequest[3];
                    data.wasteType = "Plastic Bottles";
                    data.creator = user._id;
                    data.save(()=>{
                        response = `END Waste Management System
                        Sorted Waste
                        Your Details Have Been Sent Successfully
                        Location            : ${user.location}
                        Waste Type          : Plastic Bottles
                        Amount              : ${userRequest[2]}
                        Selling Price       : ${userRequest[3]}
                        Waste Institution   : ${wasteinstitution.name}
                        Phone number        : ${phoneNumber}`;
                    })

                    let notificationData = new getSortedNotification();
                    notificationData.completed = false;
                    notificationData.status = "Still pending";
                    notificationData.sortedWaste = data._id;
                    notificationData.institution = wasteinstitution._id;
                    notificationData.creator = user._id;
                    notificationData.createdAt = new Date().toISOString();
                    notificationData.save();

                    await userAccount.updateOne({_id: user._id}, 
                        { $push: {sortedwasteNofications: data._id} });

                    await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                        { $push: {sortedWastes: data._id} });
                })
                

            }
            else if(parseInt(array[5]) === 2 ){
                let userRequest = text.split('*');
                let WIListKey = Number(text.split("*").pop()) - 1;
                sendInstitution.find({}, async (err, wasteinstitutions)=>{
                    if(wasteinstitutions.length < 1){
                        return "No data found"
                    }
                    const  wilist = wasteinstitutions.map(({_id}) => _id)
                    const wiID = wilist[`${WIListKey}`]
                    const wasteinstitution = await sendInstitution.findById(wiID)
                 
                    let data = new sortedWaste();
                    data.location = user.location;
                    data.amount   = userRequest[2];
                    data.institution = wasteinstitution._id;
                    data.price = userRequest[3];
                    data.wasteType = "Rubber Waste";
                    data.creator = user._id;
                    data.save(()=>{
                        response = `END Waste Management System
                        Sorted Waste
                        Your Details Have Been Sent Successfully
                        Location            : ${user.location}
                        Waste Type          : Rubber Waste
                        Amount              : ${userRequest[2]}
                        Selling Price       : ${userRequest[3]}
                        Waste Institution   : ${wasteinstitution.name}
                        Phone number        : ${phoneNumber}`;
                    })

                    let notificationData = new getSortedNotification();
                    notificationData.completed = false;
                    notificationData.status = "Still pending";
                    notificationData.sortedWaste = data._id;
                    notificationData.institution = wasteinstitution._id;
                    notificationData.creator = user._id;
                    notificationData.createdAt = new Date().toISOString();
                    notificationData.save();

                    await userAccount.updateOne({_id: user._id}, 
                        { $push: {sortedwasteNofications: data._id} });

                    await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                        { $push: {sortedWastes: data._id} });
                })
                

            }
            else if(parseInt(array[5]) === 3 ){
                let userRequest = text.split('*');
                let WIListKey = Number(text.split("*").pop()) - 1;
                sendInstitution.find({}, async (err, wasteinstitutions)=>{
                    if(wasteinstitutions.length < 1){
                        return "No data found"
                    }
                    const  wilist = wasteinstitutions.map(({_id}) => _id)
                    const wiID = wilist[`${WIListKey}`]
                    const wasteinstitution = await sendInstitution.findById(wiID)
                 
                    let data = new sortedWaste();
                    data.location = user.location;
                    data.amount   = userRequest[2];
                    data.institution = wasteinstitution._id;
                    data.price = userRequest[3];
                    data.wasteType = "Glass Waste";
                    data.creator = user._id;
                    data.save(()=>{
                        response = `END Waste Management System
                        Sorted Waste
                        Your Details Have Been Sent Successfully
                        Location            : ${user.location}
                        Waste Type          :  Glass Waste
                        Amount              : ${userRequest[2]}
                        Selling Price       : ${userRequest[3]}
                        Waste Institution   : ${wasteinstitution.name}
                        Phone number        : ${phoneNumber}`;
                    })
                    await userAccount.updateOne({_id: user._id}, 
                        { $push: {sortedwasteNofications: data._id} });

                    await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                        { $push: {sortedWastes: data._id} });
                })
                

            }
            else if(parseInt(array[5]) === 4 ){
                let userRequest = text.split('*');
                let WIListKey = Number(text.split("*").pop()) - 1;
                sendInstitution.find({}, async (err, wasteinstitutions)=>{
                    if(wasteinstitutions.length < 1){
                        return "No data found"
                    }
                    const  wilist = wasteinstitutions.map(({_id}) => _id)
                    const wiID = wilist[`${WIListKey}`]
                    const wasteinstitution = await sendInstitution.findById(wiID)
                 
                    let data = new sortedWaste();
                    data.location = user.location;
                    data.amount   = userRequest[2];
                    data.institution = wasteinstitution._id;
                    data.price = userRequest[3];
                    data.wasteType = "Thin Plastics";
                    data.creator = user._id;
                    data.save(()=>{
                        response = `END Waste Management System
                        Sorted Waste
                        Your Details Have Been Sent Successfully
                        Location            : ${user.location}
                        Waste Type          :  Thin Plastics
                        Amount              : ${userRequest[2]}
                        Selling Price       : ${userRequest[3]}
                        Waste Institution   : ${wasteinstitution.name}
                        Phone number        : ${phoneNumber}`;
                    })


                    let notificationData = new getSortedNotification();
                    notificationData.completed = false;
                    notificationData.status = "Still pending";
                    notificationData.sortedWaste = data._id;
                    notificationData.institution = wasteinstitution._id;
                    notificationData.creator = user._id;
                    notificationData.createdAt = new Date().toISOString();
                    notificationData.save();

                    await userAccount.updateOne({_id: user._id}, 
                        { $push: {sortedwasteNofications: data._id} });

                    await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                        { $push: {sortedWastes: data._id} });
                })
                

            }
            else if(parseInt(array[5]) === 5 ){
                let userRequest = text.split('*');
                let WIListKey = Number(text.split("*").pop()) - 1;
                sendInstitution.find({}, async (err, wasteinstitutions)=>{
                    if(wasteinstitutions.length < 1){
                        return "No data found"
                    }
                    const  wilist = wasteinstitutions.map(({_id}) => _id)
                    const wiID = wilist[`${WIListKey}`]
                    const wasteinstitution = await sendInstitution.findById(wiID)
                 
                    let data = new sortedWaste();
                    data.location = user.location;
                    data.amount   = userRequest[2];
                    data.institution = wasteinstitution._id;
                    data.price = userRequest[3];
                    data.wasteType = "Recyclable Cans";
                    data.creator = user._id;
                    data.save(()=>{
                        response = `END Waste Management System
                        Sorted Waste
                        Your Details Have Been Sent Successfully
                        Location            : ${user.location}
                        Waste Type          : Recyclable Cans
                        Amount              : ${userRequest[2]}
                        Selling Price       : ${userRequest[3]}
                        Waste Institution   : ${wasteinstitution.name}
                        Phone number        : ${phoneNumber}`;
                    })

                    let notificationData = new getSortedNotification();
                    notificationData.completed = false;
                    notificationData.status = "Still pending";
                    notificationData.sortedWaste = data._id;
                    notificationData.institution = wasteinstitution._id;
                    notificationData.creator = user._id;
                    notificationData.createdAt = new Date().toISOString();
                    notificationData.save();

                    await userAccount.updateOne({_id: user._id}, 
                        { $push: {sortedwasteNofications: data._id} });

                    await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                        { $push: {sortedWastes: data._id} });
                })
                

            }
            else if(parseInt(array[5]) === 6 ){
                response = `CON Waste Management System
                        Choose Waste Type
                        Other Waste
                        Name of waste (e.g Nsapato)`;
            }

        } 


        else if (length === 7 && txt[0] === '4'){
            let userRequest = text.split('*');
            //let WIListKey = Number(text.split("*").pop()) - 3;
            //let WIListKey = Number(userRequest[4].pop()) - 1;
            let WIListKey = Number(userRequest[4]) - 1;
            sendInstitution.find({}, async (err, wasteinstitutions)=>{
                if(wasteinstitutions.length < 1){
                    return "No data found"
                }
                const  wilist = wasteinstitutions.map(({_id}) => _id)
                const wiID = wilist[`${WIListKey}`]
                const wasteinstitution = await sendInstitution.findById(wiID)
             
                let data = new sortedWaste();
                data.location = user.location;
                data.amount   = userRequest[2];
                data.institution = wasteinstitution._id;
                data.price = userRequest[3];
                data.wasteType = userRequest[6];
                data.creator = user._id;
                data.save(()=>{
                    response = `END Waste Management System
                    Sorted Waste
                    Your Details Have Been Sent Successfully
                    Location            : ${user.location}
                    Waste Type          : ${userRequest[6]}
                    Amount              : ${userRequest[2]}
                    Selling Price       : ${userRequest[3]}
                    Waste Institution   : ${wasteinstitution.name}
                    Phone number        : ${phoneNumber}`;
                })

                let notificationData = new getSortedNotification();
                notificationData.completed = false;
                notificationData.status = "Still pending";
                notificationData.sortedWaste = data._id;
                notificationData.institution = wasteinstitution._id;
                notificationData.creator = user._id;
                notificationData.createdAt = new Date().toISOString();
                notificationData.save();

                await userAccount.updateOne({_id: user._id}, 
                    { $push: {sortedwasteNofications: data._id} });

                await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                    { $push: {sortedWastes: data._id} });
            })
    
        }

/*******************************************  END RECORD SORTED - ALL SUBMENUS IMPLEMENTATIONS  ****************************************/

/*******************************************  ACCOUNT DETAILS - ALL SUBMENUS IMPLEMENTATIONS   ****************************************/  
        // Account Menu
    else if (reply.length == 2 && reply[1] === '1'){
          response = `CON Enter Your PIN`  
    }

    
     else if (reply.length == 3 && reply[1] === '1'){
            let array = text.split('*');
            let enteredPin = array[2];
            bcrypt.compare(enteredPin, user.pin, function(err, isMatch) {
                if (err) {
                  throw err
                } else if (!isMatch) {
                    response = `END PIN Does Not Match
                                Please Try Again`;
                } else {
                    let compareNumber = userAccount.find({},{"phoneNumber": `${phoneNumber}`}).limit(1);
                    if(compareNumber){
                        search.find({}, (err, users)=>{
                        let users_data = `${ 
                            `${users.map((item)=>{
                                if(`${item.phoneNumber}` === `${phoneNumber}`){
                                return `Name        :  ${item.fullName}
                                        Location    :  ${item.location}
                                        ID Number   :  ${item.nationalID}  
                                        Phonenumber :  ${phoneNumber}`
                                }
                            }
                            ).join("")}`
                        }`
                        response = `END Check Account Details \n${users_data}`
                    })
    
                    }else{
                        response = `END Something is Wrong`;
                    }
                }
              })

     }
     else if ( userResponse === "5*2"){
         // Business logic for second level response
         response = `CON Waste Management System
             Check Account Details
             Enter Your PIN`;
         
     }

     else if (reply.length == 3 && txt[0] === '5'){
        // Business logic for second level response
        let array = text.split('*');
        let enteredPin = array[2];
        bcrypt.compare(enteredPin, user.pin, function(err, isMatch) {
            if (err) {
                throw err
            } else if (!isMatch) {
                response = `END PIN Does Not Match
                            Please Try Again`;
            } else {
                response = `CON Waste Management System
                            Check Account Details
                            1. Change Name
                            2. Change Location
                            3. Change ID Number
                            4. Change Language`;
            }
        })
        
    }
     
     else if (reply.length == 4 && reply[3] === '1'){
         // Business logic for second level response
         response = `CON Waste Management System
                     Change Name (e.g John Banda)
                     Enter New Name`;
    
     }
     
     else if (reply.length == 5 && reply[3] === '1'){
        let array = text.split('*');
 
        userAccountUpdate.find({}, async (err, users)=>{
            if(users.length < 1){
                return "No data found"
            }
            await userAccount.updateOne({_id: user._id}, { fullName: `${array[4]}` });
            response =  `END Waste Management System
                         Your Name Has Been Updated To
                         New User Name: ${array[4]}`;
        })
        
     }
    
     else if (reply.length == 3 && reply[3] === '2'){
         // Business logic for second level response
         response = `CON Waste Management System
                     Change Name (E.g Limbe)
                     Enter New Location`;
         
     }

     else if (reply.length == 4 && reply[3] === '2'){
        let array = text.split('*');
 
        userAccountUpdate.find({}, async (err, users)=>{
            if(users.length < 1){
                return "No data found"
            }
            await userAccount.updateOne({_id: user._id}, { location: `${array[4]}` });
            response =  `END Waste Management System
                         Your Location Has Been Updated To
                         New Location: ${array[4]}`;
        })
        
     }

     else if (reply.length == 3 && reply[3] === '3'){
         // Business logic for second level response
         response = `CON Waste Management System
                     Change Name
                     Enter New ID Number`;
         
     }

     else if (reply.length == 4 && reply[3] === '3'){
        let array = text.split('*');
 
        userAccountUpdate.find({}, async (err, users)=>{
            if(users.length < 1){
                return "No data found"
            }
            await userAccount.updateOne({_id: user._id}, { nationalID: `${array[4]}` });
            response =  `END Waste Management System
                         Your ID Number Has Been Updated To
                         New ID Number: ${array[4]}`;
        })
        
     }
     else if (reply.length == 4 && reply[3] === '4'){
        // Business logic for second level response
        response = `CON Waste Management System
                    Change Language To
                    1. English
                    2. Chichewa`;
        
    }

    else if (reply.length == 5 && reply[3] === '4'){
        let array = text.split('*');
        // Business logic for second level response
        if(parseInt(array[4]) == 1){
            let array = text.split('*');
            array[4] = 'english';
            userAccountUpdate.find({}, async (err, users)=>{
                if(users.length < 1){
                    return "No data found"
                }
                await userAccount.updateOne({_id: user._id}, {language: 'english' });
                response =  `END Waste Management System
                             Your ID Language Updated To
                             New Language: ${array[4]}`;
            })
            
        }
        else if(parseInt(array[4]) == 2){
            let array = text.split('*');
            array[4] = 'chichewa'
            userAccountUpdate.find({}, async (err, users)=>{
                if(users.length < 1){
                    return "No data found"
                }
                await userAccount.updateOne({_id: user._id}, {language: 'chichewa' });
                response =  `END Waste Management System
                                Your ID Language Updated To
                                New Language: ${array[4]}`;
            })
        } else{
            response = 'END Wrong Option!'
        }
    
    }



/*******************************************  END OF ACCOUNT DETAILS - ALL SUBMENUS IMPLEMENTATIONS  ****************************************/

    }else if(user.language === 'chichewa' && user.blocked === false){
        // Main Menu
        if (reply.length == 0) {

            // This is the first request. Note how we start the response with CON
            response = `CON Waste Management System
                Sankhani Njira Yomwe Mungakonde
                1. Funsani Zotolera Zosonkhanitsa
                2. Nenani Zotaya Zosavomerezeka
                3. Unikani
                4. Nenani Zotayira Zosanjidwa
                5. Akaunti Yanga
                6. Thandizeni`;
        }
        // Funsani Zotolera Zosonkhanitsa Menu
        else if (reply.length == 1 && reply[0] === '1'){
            // Business logic for first level response
            response = `CON Waste Management System
                Funsani Zotolera Zosonkhanitsa
                1. Lowetsani Kuchuluka kwa Zinyalala
                2. Manambala a foni
                3. Zidziwitso
                0. Kubwerera`;
        } 
        // Report Illegal Dumping Menu
        else if (reply.length == 1 && reply[0] === '2'){
            // Business logic second level reponse
            response = `CON Waste Management System
                Nenani za Kutaya Mosaloledwa
                1. Lowetsani Dzina La Malo
                2. Manambala a foni
                0. Kubwerera`;
                
        }
        // Review An Area Menu
        else if (reply.length == 1 && reply[0] === '3'){
            // Business logic third level reponse
            response = `CON Waste Management System
                Unikani Kampani
                1. Sankhani Kampani
                2. Manambala a foni
                0. Kubwerera`;

        }
        // Record Sorted Waste Menu
        else if (reply.length == 1 && reply[0] === '4'){
            // Business logic fourth level reponse
            response = `CON Waste Management System
                Nenani Zotayira Zosanjidwa
                1. Lowani Zotayira Zosanjidwa
                2. Manambala a foni
                0. Kubwerera`;
        }
        // Account Menu
        else if (reply.length == 1 && reply[0] === '5'){
            // Business logic for fifth level response
            response = `CON Waste Management System
                Onani Zambiri Za Akaunti
                1. Onani Zomwe Mumalemba
                2. Sinthani Zambiri Za Akaunti
                0. Kubwerera`;
        }

        // Help Menu
        else if (reply.length == 1 && reply[0] === '6'){
            // Business logic for fifth level response
            sendInstitution.find({}, (err, wasteinstitution)=>{

                let institution_data = `${
                    wasteinstitution.length < 1 ? ` Palibe deta yomwe yapezeka`
                    : 
                    `${wasteinstitution.map((item, index)=>{
                    return `${item._id = index+1}. ${item.name}
                            ${item.phoneNumber}\n`
                                    
                    }
                    ).join("")}`
                }`
                response = `END Malo Othandizira. \n${institution_data}`  
            })
        }


        /*******************************************  END OF MAIN MENU IMPLEMENTATIONS ( 1 and 2 levels)  ****************************************/       


        /*******************************************  Funsani Zotolera Zosonkhanitsa MENU - ALL SUBMENUS IMPLEMENTATIONS   ****************************************/  
        // Funsani Zotolera Zosonkhanitsa Menu
        else if (userResponse === "1*1"){
            // Business logic for first level response
            response = `CON Waste Management System
                    Funsani Zotolera Zosonkhanitsa
                    Kuchuluka kwa zinyalala (mwachitsanzo 10Kgs)`;
        } 

        else if (userResponse === "1*2"){
            sendInstitution.find({}, (err, wasteinstitution)=>{
                let institution_data = `${
                    wasteinstitution.length < 1 ? ` Palibe deta yomwe yapezeka`
                    : 
                    `${wasteinstitution.map((item, index)=>{
                    return `${item._id = index+1}. ${item.name}
                            ${item.phoneNumber}\n`
                                    
                    }
                    ).join("")}`
                }`
                response = `END Funsani Zotolera Zosonkhanitsa. \n${institution_data}`  
            })
        }

        else if (userResponse === "1*3"){
            // Business logic for first level response
            getNotification.find({}, (err, notificationTrashCollection)=>{
                let notification_data = `${
                    notificationTrashCollection.length < 1 ? `No data found`
                    : 
                    `${notificationTrashCollection.map((item)=>{
                        if(item.creator = user._id && item.completed === false){
                            return `Dikirani Pempho lanu`
                        }else {
                            return `Pempho lanu lavomerezedwa`
                        }                                    
                    }
                    ).join("")}`
                }`
                response = `END Request Trash Collection. \n${notification_data}`  
            }).limit(1)
        } 

        else if (length === 3 && txt[0] === '1'){
            // Business logic for first level response
            response = `CON Waste Management System
                        Funsani Zotolera Zosonkhanitsa
                        Sankhani Mtundu Wotayira
                        1. Mabotolo a Pulasitiki
                        2. Zinyalala za Mphira
                        3. Zinyalala Zamgalasi
                        4. Mapulasitiki Oonda
                        5. Zitini Zobwezerezedwanso
                        6. Zinyalala Zina`;
        } 


        else if (length === 4 && txt[0] === '1'){
            // Business logic for first level response
            sendInstitution.find({}, (err, wasteinstitution)=>{
                let institution_data = `${
                    wasteinstitution.length < 1 ? ` Palibe deta yomwe yapezeka`
                    : 
                    `${wasteinstitution.map((item, index)=>{
                    return `${item._id = index+1}. ${item.name}
                            ${item.phoneNumber}\n`
                                    
                    }
                    ).join("")}`
                }`
                response = `CON Funsani Zotolera Zosonkhanitsa. \n${institution_data}`  
            })
        } 

        else if (length === 5 && txt[0] === '1'){
            // Business logic 
            let array = text.split('*');
            // Business logic for first level response
            if(parseInt(array[3]) === 1 ){
                let userRequest = text.split('*');
                let WIListKey = Number(text.split("*").pop()) - 1;
                sendInstitution.find({}, async (err, wasteinstitutions)=>{
                    if(wasteinstitutions.length < 1){
                        return " Palibe deta yomwe yapezeka"
                    }
                    const  wilist = wasteinstitutions.map(({_id}) => _id)
                    const wiID = wilist[`${WIListKey}`]
                    const wasteinstitution = await sendInstitution.findById(wiID)
                    
                    let data = new sendTrashRequest();
                    data.location = user.location;
                    data.amount   = userRequest[2];
                    data.latitude = 0;
                    data.longitude = 0;
                    data.body = "Trash Collection";
                    data.typeOfWaste = "Plastic Bottles";
                    data.institution = wasteinstitution._id;
                    data.creator = user._id;
                    data.createdAt = new Date().toISOString();
                    data.save(()=>{
                        response = `END Waste Management System
                        Funsani Zotolera Zosonkhanitsa
                        Location            : ${user.location} 
                        Waste Type          :  Mabotolo a Pulasitiki  
                        Amount of Waste     : ${userRequest[2]} 
                        Waste Institution   : ${wasteinstitution.name}
                        Your Number         : ${phoneNumber}`

                    })
                    await userAccount.updateOne({_id: user._id}, 
                        { $push: {trashCollectionNofications: data._id} });

                    await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                        { $push: {trashCollections: data._id} });

                })

            }
            else if(parseInt(array[3]) === 2 ){
                let userRequest = text.split('*');
                let WIListKey = Number(text.split("*").pop()) - 1;
                sendInstitution.find({}, async (err, wasteinstitutions)=>{
                    if(wasteinstitutions.length < 1){
                        return " Palibe deta yomwe yapezeka"
                    }
                    const  wilist = wasteinstitutions.map(({_id}) => _id)
                    const wiID = wilist[`${WIListKey}`]
                    const wasteinstitution = await sendInstitution.findById(wiID)
                    
                    let data = new sendTrashRequest();
                    data.location = user.location;
                    data.amount   = userRequest[2];
                    data.latitude = 0;
                    data.longitude = 0;
                    data.body = "Trash Collection";
                    data.typeOfWaste = "Rubber Waste";
                    data.institution = wasteinstitution._id;
                    data.creator = user._id;
                    data.createdAt = new Date().toISOString();
                    data.save(()=>{
                        response = `END Waste Management System
                        Funsani Zotolera Zosonkhanitsa
                        Malo                    : ${user.location} 
                        Mtundu Wotayira         : Zinyalala za Mphira  
                        Kuchuluka kwa Zinyalala : ${userRequest[2]} 
                        Waste Institution       : ${wasteinstitution.name}
                        Nambala Yanu            : ${phoneNumber}`


                    })
                    await userAccount.updateOne({_id: user._id}, 
                        { $push: {trashCollectionNofications: data._id} });

                    await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                        { $push: {trashCollections: data._id} });


                })
                

            }
            else if(parseInt(array[3]) === 3 ){
                let userRequest = text.split('*');
                let WIListKey = Number(text.split("*").pop()) - 1;
                sendInstitution.find({}, async (err, wasteinstitutions)=>{
                    if(wasteinstitutions.length < 1){
                        return " Palibe deta yomwe yapezeka"
                    }
                    const  wilist = wasteinstitutions.map(({_id}) => _id)
                    const wiID = wilist[`${WIListKey}`]
                    const wasteinstitution = await sendInstitution.findById(wiID)
                    

                    let data = new sendTrashRequest();
                    data.location = user.location;
                    data.amount   = userRequest[2];
                    data.latitude = 0;
                    data.longitude = 0;
                    data.body = "Trash Collection";
                    data.typeOfWaste ="Glass Waste";
                    data.institution = wasteinstitution._id;
                    data.creator = user._id;
                    data.createdAt = new Date().toISOString();
                    data.save(()=>{
                        response = `END Waste Management System
                        Funsani Zotolera Zosonkhanitsa
                        Location            : ${user.location} 
                        Waste Type          : Zinyalala Zamgalasi  
                        Amount of Waste     : ${userRequest[2]} 
                        Waste Institution   : ${wasteinstitution.name}
                        Your Number         : ${phoneNumber}`

                        
                    })
                    await userAccount.updateOne({_id: user._id}, 
                        { $push: {trashCollectionNofications: data._id} });

                    await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                        { $push: {trashCollections: data._id} });
                })
            }
            else if(parseInt(array[3]) === 4 ){
                let userRequest = text.split('*');
                let WIListKey = Number(text.split("*").pop()) - 1;
                sendInstitution.find({}, async (err, wasteinstitutions)=>{
                    if(wasteinstitutions.length < 1){
                        return " Palibe deta yomwe yapezeka"
                    }
                    const  wilist = wasteinstitutions.map(({_id}) => _id)
                    const wiID = wilist[`${WIListKey}`]
                    const wasteinstitution = await sendInstitution.findById(wiID)
                    
                    let data = new sendTrashRequest();
                    data.location = user.location;
                    data.amount   = userRequest[2];
                    data.latitude = 0;
                    data.longitude = 0;
                    data.body = "Trash Collection";
                    data.typeOfWaste = "Thin Plastics";
                    data.institution = wasteinstitution._id;
                    data.creator = user._id;
                    data.createdAt = new Date().toISOString();
                    data.save(()=>{
                        response = `END Waste Management System
                        Funsani Zotolera Zosonkhanitsa
                        Location            : ${user.location} 
                        Waste Type          :  Mapulasitiki Oonda
                        Amount of Waste     : ${userRequest[2]} 
                        Waste Institution   : ${wasteinstitution.name}
                        Your Number         : ${phoneNumber}`

                    })
                    await userAccount.updateOne({_id: user._id}, 
                        { $push: {trashCollectionNofications: data._id} });

                    await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                        { $push: {trashCollections: data._id} });
                })
                

            }
            else if(parseInt(array[3]) === 5 ){
                let userRequest = text.split('*');
                let WIListKey = Number(text.split("*").pop()) - 1;
                sendInstitution.find({}, async (err, wasteinstitutions)=>{
                    if(wasteinstitutions.length < 1){
                        return " Palibe deta yomwe yapezeka"
                    }
                    const  wilist = wasteinstitutions.map(({_id}) => _id)
                    const wiID = wilist[`${WIListKey}`]
                    const wasteinstitution = await sendInstitution.findById(wiID)
                    
                    let data = new sendTrashRequest();
                    data.location = user.location;
                    data.amount   = userRequest[2];
                    data.latitude = 0;
                    data.longitude = 0;
                    data.body = "Trash Collection";
                    data.typeOfWaste = "Recyclable Cans";
                    data.institution = wasteinstitution._id;
                    data.creator = user._id;
                    data.createdAt = new Date().toISOString();
                    data.save(()=>{
                        response = `END Waste Management System
                        Funsani Zotolera Zosonkhanitsa
                        Location            : ${user.location} 
                        Waste Type          : Zitini Zobwezerezedwanso
                        Amount of Waste     : ${userRequest[2]} 
                        Waste Institution   : ${wasteinstitution.name}
                        Your Number         : ${phoneNumber}`
                    })
                    await userAccount.updateOne({_id: user._id}, 
                        { $push: {trashCollectionNofications: data._id} });

                    await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                        { $push: {trashCollections: data._id} });
                })
                

            }
            else if(parseInt(array[3]) === 6 ){
                response = `CON Waste Management System
                            Funsani Zotolera Zosonkhanitsa
                            Enter name of waste (e.g Cans)`;
            }
        }

        else if (length === 6 && txt[0] === '1'){
            let userRequest = text.split('*');
            //let WIListKey = Number(text.split("*").pop()) - 1;
            let WIListKey = Number(userRequest[4]) - 1;
            sendInstitution.find({}, async (err, wasteinstitutions)=>{
                if(wasteinstitutions.length < 1){
                    return " Palibe deta yomwe yapezeka"
                }
                const  wilist = wasteinstitutions.map(({_id}) => _id)
                const wiID = wilist[`${WIListKey}`]
                const wasteinstitution = await sendInstitution.findById(wiID)

                let data = new sendTrashRequest();
                data.location = user.location;
                data.amount   = userRequest[2];
                data.latitude = 0;
                data.longitude = 0;
                data.body = "Trash Collection";
                data.typeOfWaste = userRequest[5];
                data.institution = wasteinstitution._id;
                data.creator = user._id;
                data.createdAt = new Date().toISOString();
                data.save(()=>{
                    response = `END Waste Management System
                    Funsani Zotolera Zosonkhanitsa
                    Malo                       : ${user.location} 
                    Waste Type                 : ${userRequest[5]} 
                    Kuchuluka kwa Zinyalala    : ${userRequest[2]} 
                    Waste Institution          : ${wasteinstitution.name}
                    Nambala Yanu               : ${phoneNumber}`
                })
                await userAccount.updateOne({_id: user._id}, 
                    { $push: {trashCollectionNofications: data._id} });

                await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                    { $push: {trashCollections: data._id} });
            })
        }    


        /*******************************************  END REQUEST TRASH - ALL SUBMENUS IMPLEMENTATIONS  ****************************************/


        /*******************************************  REPORT ILLEGAL Dumping MENU - ALL SUBMENUS IMPLEMENTATIONS   ****************************************/  
        // Report Illegal Dumping Menu
        else if (userResponse === "2*1"){
            // Business logic 
            response = `CON Waste Management System
                Nenani Zotaya Zosavomerezeka
                Komwe Kutayira mosaloledwa`;
        }

        else if (length === 3 && txt[0] === '2'){
            // Business logic 
            response = `CON Waste Management System
                        Nenani Zotaya Zosavomerezeka
                        Ndemanga`;
        }

        else if (userResponse === "2*2"){
            // Business logic for second level response
            sendInstitution.find({}, (err, wasteinstitution)=>{
                let institution_data = `${
                    wasteinstitution.length < 1 ? ` Palibe deta yomwe yapezeka`
                    : 
                    `${wasteinstitution.map((item, index)=>{
                    return `${item._id = index+1}. ${item.name}
                            ${item.phoneNumber}\n`
                                    
                    }
                    ).join("")}`
                }`
                response = `END Nenani Zotaya Zosavomerezeka \n${institution_data}`  
            })  
        }
        else if (length === 4 && txt[0] === '2'){
            // Business logic for second level response
            sendInstitution.find({}, (err, wasteinstitution)=>{
                let institution_data = `${
                    wasteinstitution.length < 1 ? ` Palibe deta yomwe yapezeka`
                    : 
                    `${wasteinstitution.map((item, index)=>{
                    return `${item._id = index+1}. ${item.name}
                            ${item.phoneNumber}\n`
                                    
                    }
                    ).join("")}`
                }`
                response = `CON Nenani Zotaya Zosavomerezeka \n${institution_data}`  
            })  
        }

        else if (length === 5 && txt[0] === '2'){
            let userRequest = text.split('*');
            let WIListKey = Number(text.split("*").pop()) - 1;
            sendInstitution.find({}, async (err, wasteinstitutions)=>{
                if(wasteinstitutions.length < 1){
                    return " Palibe deta yomwe yapezeka"
                }
                const  wilist = wasteinstitutions.map(({_id}) => _id)
                const wiID = wilist[`${WIListKey}`]
                const wasteinstitution = await sendInstitution.findById(wiID)

                let data = new illegalDumping();
                data.location = userRequest[2];
                data.institution = wasteinstitution._id;
                data.comment = userRequest[3];
                data.latitude = 0;
                data.longitude = 0;
                data.creator = user._id;
                data.createdAt = new Date().toISOString();
                data.save(()=>{
                    response = `END Waste Management System
                    Funsani Zotolera Zosonkhanitsa
                    Malo                : ${userRequest[2]} 
                    Ndemanga            : ${userRequest[3]}
                    Waste Institution   : ${wasteinstitution.name}
                    Nambala Yanu        : ${phoneNumber}`
                })
                await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                    { $push: {illegalDumpings: data._id} });
            })



        }
        /*******************************************  END REPORT ILLEGAL DUMPING - ALL SUBMENUS IMPLEMENTATIONS  ****************************************/

        /*******************************************  REVIEW AN AREA MENU - ALL SUBMENUS IMPLEMENTATIONS   ****************************************/  
        // Report Illegal Dumping Menu
        else if (userResponse === "3*1"){
            // Business logic 
            sendInstitution.find({}, (err, wasteinstitution)=>{
                let institution_data = `${
                    wasteinstitution.length < 1 ? ` Palibe deta yomwe yapezeka`
                    : 
                    `${wasteinstitution.map((item, index)=>{
                    return `${item._id = index+1}. ${item.name}
                            ${item.phoneNumber}\n`
                                    
                    }
                    ).join("")}`
                }`
                response = `CON Sankhani Kampani Yoti Muunike \n${institution_data}`  
            })
        }

        else if (userResponse === "3*2"){
            // Business logic for second level response
            sendInstitution.find({}, (err, wasteinstitution)=>{
                let institution_data = `${
                    wasteinstitution.length < 1 ? ` Palibe deta yomwe yapezeka`
                    : 
                    `${wasteinstitution.map((item, index)=>{
                    return `${item._id = index+1}. ${item.name}
                            ${item.phoneNumber}\n`
                                    
                    }
                    ).join("")}`
                }`
                response = `END Unikani Kampani. \n${institution_data}`  
            })
            
        }


        else if (length === 3 && txt[0] === '3'){
            // Business logic 
            response = `CON Waste Management System
                Unikani Malo
                Perekani Mavoti (Sankhani Manambala 0 - 5 mwachitsanzo 0, 1.5)`;
        }

        else if (length === 4 && txt[0] === '3'){
            // Business logic 
            response = `CON Waste Management System
                Unikani Malo
                Ndemanga (Chifukwa Chiyani Mumayesa Malo)`;
        }

        else if (length === 5 && txt[0] === '3'){
            let array = text.split('*');
            let WIListKey = Number(array[0]);
            sendInstitution.find({}, async (err, wasteinstitutions)=>{
                if(wasteinstitutions.length < 1){
                    return " Palibe deta yomwe yapezeka"
                }
                const  wilist = wasteinstitutions.map(({_id}) => _id)
                const wiID = wilist[`${WIListKey}`]
                const wasteinstitution = await sendInstitution.findById(wiID)
                if(array[3] >= 0 && array[3] <= 5){
                let data = new getRating();
                data.comment = array[4];
                data.rating = array[3];
                data.institution = wasteinstitution._id;
                data.creator = user._id;
                data.createdAt = new Date().toISOString();
                data.save(()=>{
                    response = `END Waste Management System
                    Funsani Zotolera Zosonkhanitsa
                    Ndemanga            : ${array[4]}
                    Mavoti              : ${array[3]}
                    Waste Institution   : ${wasteinstitution.name}
                    Nambala Yanu        : ${phoneNumber}`
                })
                await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                    { $push: {reviews: data._id} });

            }else if(array[3] < 0){

                let data = new getRating();
                data.comment = array[4];
                data.rating = "0";
                data.institution = wasteinstitution._id;
                data.creator = user._id;
                data.createdAt = new Date().toISOString();
                data.save(()=>{
                    response = `END Waste Management System
                    Funsani Zotolera Zosonkhanitsa
                    Ndemanga            : ${array[4]}
                    Mavoti              : 0
                    Waste Institution   : ${wasteinstitution.name}
                    Nambala Yanu        : ${phoneNumber}`
                })
                await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                    { $push: {reviews: data._id} });

            }else if(array[3] > 5){
                let data = new getRating();
                data.comment = array[4];
                data.rating = "5";
                data.institution = wasteinstitution._id;
                data.creator = user._id;
                data.createdAt = new Date().toISOString();
                data.save(()=>{
                    response = `END Waste Management System
                    Funsani Zotolera Zosonkhanitsa
                    Ndemanga            : ${array[4]}
                    Mavoti              : 5
                    Waste Institution   : ${wasteinstitution.name}
                    Nambala Yanu        : ${phoneNumber}`
                })
                await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                    { $push: {reviews: data._id} });
            }else {
                response = `END Waste Management System
                            Something Went Wrong`;
            }

            })
        }
        /*******************************************  END REVIEW AN AREA - ALL SUBMENUS IMPLEMENTATIONS  ****************************************/

        /*******************************************  RECORD SORTED WASTE - ALL SUBMENUS IMPLEMENTATIONS   ****************************************/  
        // Report Illegal Dumping Menu
        else if (userResponse === "4*1"){
            let array = text.split('*');
            // Business logic 
            response = `CON Waste Management System
                        Lowetsani Mtengo Wotayika (monga 10Kg)`;
                
        }


        else if (userResponse === "4*2"){
            // Business logic for second level response
            sendInstitution.find({}, (err, wasteinstitution)=>{
                let institution_data = `${
                    wasteinstitution.length < 1 ? ` Palibe deta yomwe yapezeka`
                    : 
                    `${wasteinstitution.map((item, index)=>{
                    return `${item._id = index+1}. ${item.name}
                            ${item.phoneNumber}\n`
                                    
                    }
                    ).join("")}`
                }`
                response = `END Pezani Nambala yafoni. \n${institution_data}`  
            })        
        }

        else if (userResponse === "4*3"){
            // Business logic for first level response
            getSortedNotification.find({}, (err, notificationSortedWaste)=>{
                let notification_data = `${
                    notificationSortedWaste.length < 1 ? `No data found`
                    : 
                    `${notificationSortedWaste.map((item)=>{
                        if(item.creator = user._id && item.completed === false){
                            return `Dikilirani Pempho lomwe munatumiza pa ${item.createdAt}`
                        }else {
                            return `Pempho lavomerezedwa ${item.createdAt}`
                        }                                    
                    }
                    ).join("")}`
                }`
                response = `END Sorted Waste. \n${notification_data}`  
            }).limit(2)
        } 

        else if (length === 3 && txt[0] === '4'){
            // Business logic for second level response
            response = `CON Waste Management System
                        Kugulitsa Mtengo wa Zotayika Zosinthidwa (mwachitsanzo K100)`;
        
        }

        else if (length === 4 && txt[0] === '4'){

            sendInstitution.find({}, (err, wasteinstitution)=>{
                let institution_data = `${
                    wasteinstitution.length < 1 ? ` Palibe deta yomwe yapezeka`
                    : 
                    `${wasteinstitution.map((item, index)=>{
                    return `${item._id = index+1}. ${item.name}
                            ${item.phoneNumber}\n`
                                    
                    }
                    ).join("")}`
                }`
                response = `CON Nenani Zotayira Zosanjidwa \n${institution_data}`  
            })
        }

        else if (length === 5 && txt[0] === '4'){
            // Business logic for first level response
            response = `CON Waste Management System
                        Sankhani Mtundu Wotayira
                        1. Mabotolo a Pulasitiki
                        2. Zinyalala za Mphira
                        3. Zinyalala Zamgalasi
                        4. Mapulasitiki Oonda
                        5. Zitini Zobwezerezedwanso
                        6. Zinyalala Zina`;
        } 

        else if (length === 6 && txt[0] === '4'){
            let array = text.split('*');
            // Business logic for first level response
            if(parseInt(array[5]) === 1 ){
                let userRequest = text.split('*');
                let WIListKey = Number(text.split("*").pop()) - 1;
                sendInstitution.find({}, async (err, wasteinstitutions)=>{
                    if(wasteinstitutions.length < 1){
                        return " Palibe deta yomwe yapezeka"
                    }
                    const  wilist = wasteinstitutions.map(({_id}) => _id)
                    const wiID = wilist[`${WIListKey}`]
                    const wasteinstitution = await sendInstitution.findById(wiID)
                
                    let data = new sortedWaste();
                    data.location = user.location;
                    data.amount   = userRequest[2];
                    data.institution = wasteinstitution._id;
                    data.price = userRequest[3];
                    data.wasteType = "Plastic Bottles";
                    data.creator = user._id;
                    data.save(()=>{
                        response = `END Waste Management System
                        Zinyalala Zosanjidwa
                        Zatumizidwa Bwino
                        Malo                     : ${user.location}
                        Mtundu wa chinyalala     : Mabotolo a Pulasitiki
                        Mlingo                   : ${userRequest[2]}
                        Mtengo Wogulisa          : ${userRequest[3]}
                        Waste Institution        : ${wasteinstitution.name}
                        Phone Numbala            : ${phoneNumber}`;
                    })
                    await userAccount.updateOne({_id: user._id}, 
                        { $push: {sortedwasteNofications: data._id} });

                    await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                        { $push: {sortedWastes: data._id} });
                })
                

            }
            else if(parseInt(array[5]) === 2 ){
                let userRequest = text.split('*');
                let WIListKey = Number(text.split("*").pop()) - 1;
                sendInstitution.find({}, async (err, wasteinstitutions)=>{
                    if(wasteinstitutions.length < 1){
                        return " Palibe deta yomwe yapezeka"
                    }
                    const  wilist = wasteinstitutions.map(({_id}) => _id)
                    const wiID = wilist[`${WIListKey}`]
                    const wasteinstitution = await sendInstitution.findById(wiID)
                
                    let data = new sortedWaste();
                    data.location = user.location;
                    data.amount   = userRequest[2];
                    data.institution = wasteinstitution._id;
                    data.price = userRequest[3];
                    data.wasteType = "Rubber Waste";
                    data.creator = user._id;
                    data.save(()=>{
                        response = `END Waste Management System
                        Sorted Waste
                        Your Details Have Been Sent Successfully
                        Location            : ${user.location}
                        Waste Type          : Rubber Waste
                        Amount              : ${userRequest[2]}
                        Selling Price       : ${userRequest[3]}
                        Waste Institution   : ${wasteinstitution.name}
                        Phone number        : ${phoneNumber}`;
                    })
                    await userAccount.updateOne({_id: user._id}, 
                        { $push: {sortedwasteNofications: data._id} });

                    await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                        { $push: {sortedWastes: data._id} });
                })
                

            }
            else if(parseInt(array[5]) === 3 ){
                let userRequest = text.split('*');
                let WIListKey = Number(text.split("*").pop()) - 1;
                sendInstitution.find({}, async (err, wasteinstitutions)=>{
                    if(wasteinstitutions.length < 1){
                        return " Palibe deta yomwe yapezeka"
                    }
                    const  wilist = wasteinstitutions.map(({_id}) => _id)
                    const wiID = wilist[`${WIListKey}`]
                    const wasteinstitution = await sendInstitution.findById(wiID)
                
                    let data = new sortedWaste();
                    data.location = user.location;
                    data.amount   = userRequest[2];
                    data.institution = wasteinstitution._id;
                    data.price = userRequest[3];
                    data.wasteType = "Glass Waste";
                    data.creator = user._id;
                    data.save(()=>{
                        response = `END Waste Management System
                        Sorted Waste
                        Your Details Have Been Sent Successfully
                        Location            : ${user.location}
                        Waste Type          :  Glass Waste
                        Amount              : ${userRequest[2]}
                        Selling Price       : ${userRequest[3]}
                        Waste Institution   : ${wasteinstitution.name}
                        Phone number        : ${phoneNumber}`;
                    })
                    await userAccount.updateOne({_id: user._id}, 
                        { $push: {sortedwasteNofications: data._id} });

                    await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                        { $push: {sortedWastes: data._id} });
                })
                

            }
            else if(parseInt(array[5]) === 4 ){
                let userRequest = text.split('*');
                let WIListKey = Number(text.split("*").pop()) - 1;
                sendInstitution.find({}, async (err, wasteinstitutions)=>{
                    if(wasteinstitutions.length < 1){
                        return " Palibe deta yomwe yapezeka"
                    }
                    const  wilist = wasteinstitutions.map(({_id}) => _id)
                    const wiID = wilist[`${WIListKey}`]
                    const wasteinstitution = await sendInstitution.findById(wiID)
                
                    let data = new sortedWaste();
                    data.location = user.location;
                    data.amount   = userRequest[2];
                    data.institution = wasteinstitution._id;
                    data.price = userRequest[3];
                    data.wasteType = "Thin Plastics";
                    data.creator = user._id;
                    data.save(()=>{
                        response = `END Waste Management System
                        Sorted Waste
                        Your Details Have Been Sent Successfully
                        Location            : ${user.location}
                        Waste Type          :  Thin Plastics
                        Amount              : ${userRequest[2]}
                        Selling Price       : ${userRequest[3]}
                        Waste Institution   : ${wasteinstitution.name}
                        Phone number        : ${phoneNumber}`;
                    })
                    await userAccount.updateOne({_id: user._id}, 
                        { $push: {sortedwasteNofications: data._id} });

                    await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                        { $push: {sortedWastes: data._id} });
                })
                

            }
            else if(parseInt(array[5]) === 5 ){
                let userRequest = text.split('*');
                let WIListKey = Number(text.split("*").pop()) - 1;
                sendInstitution.find({}, async (err, wasteinstitutions)=>{
                    if(wasteinstitutions.length < 1){
                        return " Palibe deta yomwe yapezeka"
                    }
                    const  wilist = wasteinstitutions.map(({_id}) => _id)
                    const wiID = wilist[`${WIListKey}`]
                    const wasteinstitution = await sendInstitution.findById(wiID)
                
                    let data = new sortedWaste();
                    data.location = user.location;
                    data.amount   = userRequest[2];
                    data.institution = wasteinstitution._id;
                    data.price = userRequest[3];
                    data.wasteType = "Recyclable Cans";
                    data.creator = user._id;
                    data.save(()=>{
                        response = `END Waste Management System
                        Sorted Waste
                        Your Details Have Been Sent Successfully
                        Location            : ${user.location}
                        Waste Type          : Recyclable Cans
                        Amount              : ${userRequest[2]}
                        Selling Price       : ${userRequest[3]}
                        Waste Institution   : ${wasteinstitution.name}
                        Phone number        : ${phoneNumber}`;
                    })
                    await userAccount.updateOne({_id: user._id}, 
                        { $push: {sortedwasteNofications: data._id} });

                    await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                        { $push: {sortedWastes: data._id} });
                })
                

            }
            else if(parseInt(array[5]) === 6 ){
                response = `CON Waste Management System
                        Choose Waste Type
                        Other Waste
                        Name of waste (e.g Nsapato)`;
            }

        } 


        else if (length === 7 && txt[0] === '4'){
            let userRequest = text.split('*');
            //let WIListKey = Number(text.split("*").pop()) - 3;
            //let WIListKey = Number(userRequest[4].pop()) - 1;
            let WIListKey = Number(userRequest[4]) - 1;
            sendInstitution.find({}, async (err, wasteinstitutions)=>{
                if(wasteinstitutions.length < 1){
                    return " Palibe deta yomwe yapezeka"
                }
                const  wilist = wasteinstitutions.map(({_id}) => _id)
                const wiID = wilist[`${WIListKey}`]
                const wasteinstitution = await sendInstitution.findById(wiID)
            
                let data = new sortedWaste();
                data.location = user.location;
                data.amount   = userRequest[2];
                data.institution = wasteinstitution._id;
                data.price = userRequest[3];
                data.wasteType = userRequest[6];
                data.creator = user._id;
                data.save(()=>{
                    response = `END Waste Management System
                    Sorted Waste
                    Your Details Have Been Sent Successfully
                    Location            : ${user.location}
                    Waste Type          : ${userRequest[6]}
                    Amount              : ${userRequest[2]}
                    Selling Price       : ${userRequest[3]}
                    Waste Institution   : ${wasteinstitution.name}
                    Phone number        : ${phoneNumber}`;
                })
                await userAccount.updateOne({_id: user._id}, 
                    { $push: {sortedwasteNofications: data._id} });

                await sendInstitution.updateOne({_id: wasteinstitution._id}, 
                    { $push: {sortedWastes: data._id} });
            })

        }

        /*******************************************  END RECORD SORTED - ALL SUBMENUS IMPLEMENTATIONS  ****************************************/

        /*******************************************  ACCOUNT DETAILS - ALL SUBMENUS IMPLEMENTATIONS   ****************************************/  
        // Account Menu
        else if (reply.length == 2 && reply[1] === '1'){
        response = `CON Enter Your PIN`  
        }


        else if (reply.length == 3 && reply[1] === '1'){
            let array = text.split('*');
            let enteredPin = array[2];
            bcrypt.compare(enteredPin, user.pin, function(err, isMatch) {
                if (err) {
                throw err
                } else if (!isMatch) {
                    response = `END PIN Does Not Match
                                Please Try Again`;
                } else {
                    let compareNumber = userAccount.find({},{"phoneNumber": `${phoneNumber}`}).limit(1);
                    if(compareNumber){
                        search.find({}, (err, users)=>{
                        let users_data = `${ 
                            `${users.map((item)=>{
                                if(`${item.phoneNumber}` === `${phoneNumber}`){
                                return `Name        :  ${item.fullName}
                                        Location    :  ${item.location}
                                        ID Number   :  ${item.nationalID}  
                                        Phonenumber :  ${phoneNumber}`
                                }
                            }
                            ).join("")}`
                        }`
                        response = `END Check Account Details \n${users_data}`
                    })

                    }else{
                        response = `END Something is Wrong`;
                    }
                }
            })

        }
        else if ( userResponse === "5*2"){
        // Business logic for second level response
        response = `CON Waste Management System
            Check Account Details
            Enter Your PIN`;
        
        }

        else if (reply.length == 3 && txt[0] === '5'){
        // Business logic for second level response
        let array = text.split('*');
        let enteredPin = array[2];
        bcrypt.compare(enteredPin, user.pin, function(err, isMatch) {
            if (err) {
                throw err
            } else if (!isMatch) {
                response = `END PIN Does Not Match
                            Please Try Again`;
            } else {
                response = `CON Waste Management System
                            Check Account Details
                            1. Change Name
                            2. Change Location
                            3. Change ID Number
                            4. Change Language`;
            }
        })

        }

        else if (reply.length == 4 && reply[3] === '1'){
        // Business logic for second level response
        response = `CON Waste Management System
                    Change Name (e.g John Banda)
                    Enter New Name`;

        }

        else if (reply.length == 5 && reply[3] === '1'){
        let array = text.split('*');

        userAccountUpdate.find({}, async (err, users)=>{
            if(users.length < 1){
                return " Palibe deta yomwe yapezeka"
            }
            await userAccount.updateOne({_id: user._id}, { fullName: `${array[4]}` });
            response =  `END Waste Management System
                        Your Name Has Been Updated To
                        New User Name: ${array[4]}`;
        })

        }

        else if (reply.length == 3 && reply[3] === '2'){
        // Business logic for second level response
        response = `CON Waste Management System
                    Change Name (E.g Limbe)
                    Enter New Location`;
        
        }

        else if (reply.length == 4 && reply[3] === '2'){
        let array = text.split('*');

        userAccountUpdate.find({}, async (err, users)=>{
            if(users.length < 1){
                return " Palibe deta yomwe yapezeka"
            }
            await userAccount.updateOne({_id: user._id}, { location: `${array[4]}` });
            response =  `END Waste Management System
                        Your Location Has Been Updated To
                        New Location: ${array[4]}`;
        })

        }

        else if (reply.length == 3 && reply[3] === '3'){
        // Business logic for second level response
        response = `CON Waste Management System
                    Change Name
                    Enter New ID Number`;
        
        }

        else if (reply.length == 4 && reply[3] === '3'){
        let array = text.split('*');

        userAccountUpdate.find({}, async (err, users)=>{
            if(users.length < 1){
                return " Palibe deta yomwe yapezeka"
            }
            await userAccount.updateOne({_id: user._id}, { nationalID: `${array[4]}` });
            response =  `END Waste Management System
                        Your ID Number Has Been Updated To
                        New ID Number: ${array[4]}`;
        })

        }

        else if (reply.length == 4 && reply[3] === '4'){
            // Business logic for second level response
            response = `CON Waste Management System
                        Change Language To
                        1. English
                        2. Chichewa`;
            
        }

        else if (reply.length == 5 && reply[3] === '4'){
            let array = text.split('*');
            // Business logic for second level response
            if(parseInt(array[4]) == 1){
                let array = text.split('*');
                array[4] = 'english';
                userAccountUpdate.find({}, async (err, users)=>{
                    if(users.length < 1){
                        return " Palibe deta yomwe yapezeka"
                    }
                    await userAccount.updateOne({_id: user._id}, {language: 'english' });
                    response =  `END Waste Management System
                                Your ID Language Updated To
                                New Language: ${array[4]}`;
                })
                
            }
            else if(parseInt(array[4]) == 2){
                let array = text.split('*');
                array[4] = 'chichewa'
                userAccountUpdate.find({}, async (err, users)=>{
                    if(users.length < 1){
                        return " Palibe deta yomwe yapezeka"
                    }
                    await userAccount.updateOne({_id: user._id}, {language: 'chichewa' });
                    response =  `END Waste Management System
                                    Your ID Language Updated To
                                    New Language: ${array[4]}`;
                })
            } else{
                response = 'END Wrong Option!'
            }
        
        }
        /*******************************************  END OF ACCOUNT DETAILS - ALL SUBMENUS IMPLEMENTATIONS  ****************************************/

    }else{
        response = `END You Have No Access To The System
                    Please Contact The Admin`
    }
    }
    } else {
        if(text===''){
            response = 'CON Your Are Not Registered \n Enter Your Full Name ';
        }
    
        else if(text !==''){
            let array = text.split('*');
            if(array.length === 1){
                response = 'CON Enter Your ID Number';
            }
    
            else if(array.length === 2){
                response = 'CON Enter Your Location Name'
            }
    
            else if(array.length === 3){
                response = 'CON Enter Your PIN'
            }

            else if(array.length === 4){
                if(array[3].length === 4){
                    response = 'CON Verify Your PIN'
                }else{
                    response = `END Your Pin Must Have Four Digits`
                }
            }
            else if(array.length === 5){
                if (array[3] === array[4]){
                        response = `CON Choose language to use
                                1. English
                                2. Chichewa`
                }else{
                        response = `END Your PIN Do Not Match Please Restart`; 
                }
            }

            else if(array.length === 6){
                    response = 'CON  Please Confirm to save the data \n 1. Confirm \n 2. Cancel'; 
                
            }
            else if(array.length === 7){ 
                if(parseInt(array[6]) === 1 ){
                    if(parseInt(array[5]) == 1){
                        let data = new userDetails();
                        let defaultPassword = "0123456789";
                        let newPin = array[4];
                        savePassword =   bcrypt.hashSync(defaultPassword, 10);
                        savePin =   bcrypt.hashSync(newPin, 10);
                        data.fullName = array[0];
                        data.nationalID = array[1];
                        data.location = array[2];
                        data.pin = savePin;
                        data.latitude = 0.0;
                        data.longitude = 0.0;
                        data.password = savePassword;
                        data.language  = 'english';
                        data.blocked = false;
                        data.createdAt = new Date().toISOString();
                        data.phoneNumber = req.body.phoneNumber ;
                        data.save(()=>{
                            response = 'END You Have Successfully Registered!'
                        })
                    }
                    else if(parseInt(array[5]) == 2){
                        let data = new userDetails();
                        let defaultPassword = "0123456789";
                        let newPin = array[4];
                        savePassword =   bcrypt.hashSync(defaultPassword, 10);
                        savePin =   bcrypt.hashSync(newPin, 10);
                        data.fullName = array[0];
                        data.nationalID = array[1];
                        data.location = array[2];
                        data.pin = savePin;
                        data.latitude = 0.0;
                        data.longitude = 0.0;
                        data.password = savePassword;
                        data.language = 'chichewa';
                        data.blocked = false;
                        data.createdAt = new Date().toISOString();
                        data.phoneNumber = req.body.phoneNumber ;
                        data.save(()=>{
                            response = 'END You Have Successfully Registered!'
                        })
                    } else{
                        response = 'END Wrong Option!'
                    }
                }
                else if(parseInt(array[6]) === 2){
                    response = 'END Cancel, Your data is not saved'; 
                }
                else{
                    response = 'END Invalid Input';
                }
            }
            else{
                response = 'End Network error. Please try again';
            }
    
        }
    }
    });
    
    setTimeout(()=>{
        console.log(text);
        res.send(response);
        res.end();

    }, 2000);

})
//Checking The Application Port
app.listen(PORT, () => {
    console.log('app is running on port' + PORT)
})

