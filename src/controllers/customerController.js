const controller = {};

controller.list = (req,res) =>{
    req.getConnection((err,conn) =>{
        conn.query(
            'select * from customer'
        , (err,customers) =>{
            if(err){
                res.json(err);
            }
            console.log(customers);
            res.render('customers',{
                data:customers
            })
        })
    },)}

    controller.save = ( req,res) =>{
        console.log(req.body);
        const data = req.body;

        req.getConnection((err,conn) =>{
            conn.query('insert into customer set ? ',[data],(err,customer) =>{
                if(!err){
                res.redirect('/')
                }
                console.log(err);

            })
        })
    }

    controller.edit = (req,res) =>{
        let id = req.params.id;

        req.getConnection((err,conn) =>{
            conn.query("select * from customer where id = ?", [id],(err,customer) =>{
                if(!err){
                    res.render('customer_edit',{
                        data:customer[0]
                    })
                }
                else{
                    console.log(err);
                }
            })
        },)
    }
    controller.delete = ( req,res) =>{

        const {id}= req.params;
        req.getConnection((err,conn) =>{
            conn.query(`delete from customer where id = ?`, [id], (err,rows) =>{
                if (!err) {
                    res.redirect("/")
                }
                else {
                    console.log(err);
                }
            })
        })
    }

    controller.update =(req,res) =>{
        const {id} = req.params;
        const newCustomer = req.body;
        req.getConnection((err,conn)=>{
            conn.query('update customer set ? where id = ?', [newCustomer,id] , (err,rows) =>{
                if(!err){
                    res.redirect("/");
                }

                else{
                    console.log(err);
                }
            })
        })
    }

module.exports = controller;