const server = require("../index");
const chai = require("chai");

const chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

describe("USER API  ", () => {
  // describe("User signup api ",()=>{
  // it("it should signup a user",(done)=>{
  //     const data={
  //         userEmail:"kkdsddaams@gmail.com",
  //         password:"Nc@25753"
  //     }
  //     chai.request(server)
  //     .post("/admin/user/signup")
  //     .send(data)
  //         .end((err,res)=>{
  //                 res.should.have.status(201);
  //                 res.should.be.a("object");
  //                 res.body.should.have.property("status_code")
  //                 res.body.should.have.property("message").eq("Signup Successfully");
  //           done()
  //             })
  //             })
  //             it("it should signup a user with email already exist",(done)=>{
  //                 const data={
  //                     userEmail:"tugrp99@example.com",
  //                     password:"Nc@25753"
  //                 }
  //                 chai.request(server)
  //                 .post("/admin/user/signup")
  //                 .send(data)
  //                     .end((err,res)=>{
  //                         res.should.have.status(403)
  //                         res.should.be.a("object");
  //                         res.body.should.have.property("status")
  //                         res.body.should.have.property("message").eq("userEmail Already Exited");
  //                         done()
  //                         })
  //})
  // describe("User Login Api",()=>{
  //  it("it should login a user",(done)=>{
  //         const data={
  //             userEmail:"kkdsddaams@gmail.com",
  //             password:"Nc@25753"
  //         }
  //         chai.request(server)
  //         .post("/admin/user/login")
  //         .send(data)
  //             .end((err,res)=>{
  //                     res.should.have.status(201);
  //                     res.should.be.a("object");
  //                     res.body.should.have.property("status_code")
  //                     res.body.should.have.property("message").eq("Successs");
  //                    done()
  //                 })
  //                 })
  //                     it("userEmail are incorrect",(done)=>{
  //                         const data={
  //                             userEmail:"kkdsdssdaams@gmail.com",
  //                             password:"Nc@25753"
  //                         }
  //                         chai.request(server)
  //                         .post("/admin/user/login")
  //                         .send(data)
  //                             .end((err,res)=>{
  //                                     res.should.have.status(403);
  //                                     res.should.be.a("object");
  //                                     res.body.should.have.property("status_code")
  //                                     res.body.should.have.property("message").eq("User Email Are Incorrect");
  //                                    done()
  //                                 })
  //                                 })
  // it("password are incorrect",(done)=>{
  //     const data={
  //         userEmail:"kkdsddaams@gmail.com",
  //         password:"Nc@2f5753"
  //     }
  //     chai.request(server)
  //     .post("/admin/user/login")
  //     .send(data)
  //         .end((err,res)=>{
  //                 res.should.have.status(403);
  //                 res.should.be.a("object");
  //                 res.body.should.have.property("status_code")
  //                 res.body.should.have.property("message").eq("User Password Are Incorrect");
  //                done()
  //             })
  //             })
  //  })
  // it("password and Email are not valid",(done)=>{
  //     const data={
  //         userEmail:"",
  //         password:""
  //     }
  //     chai.request(server)
  //     .post("/admin/user/login")
  //     .send(data)
  //         .end((err,res)=>{
  //                 res.should.have.status(403);
  //                 res.should.be.a("object");
  //                 res.body.should.have.property("status_code")
  //                 res.body.should.have.property("message").eq("User Email and Password Are Not Valid");
  //                done()
  //             })
  //             })
  //  })

  //    describe("send mail for reset passsword",()=>{
  // it("send mail ",(done)=>{
  //         const data={
  //             userEmail:"tugrp99@example.com",
  //         }
  //         chai.request(server)
  //         .post("/admin/user/sendMail")
  //         .send(data)
  //             .end((err,res)=>{
  //                    res.should.have.status(200);
  //                     res.should.be.a("object");
  //                     res.body.should.have.property("status_code")
  //                     res.body.should.have.property("message").eq("Success");
  //                    done()
  //                 })
  //                 })
  //                     it("userEmail are empty ",(done)=>{
  //                         const data={
  //                             userEmail:"",
  //                         }
  //                         chai.request(server)
  //                         .post("/admin/user/sendMail")
  //                         .send(data)
  //                             .end((err,res)=>{
  //                                    res.should.have.status(400);
  //                                     res.should.be.a("object");
  //                                     res.body.should.have.property("status_code")
  //                                     res.body.should.have.property("message").eq("userEmail are empty");
  //                                    done()
  //                                 })
  //                                 })

  // describe(" reset passsword",()=>{
  //     it("reset-paaword",(done)=>{
  //                 const data={
  //                     password:"Nc@1234",
  //                     confirmPassword :"Nc@1234"
  //                 }
  //                 chai.request(server)
  //                 .post("/admin/user/reset-password/6475a22529d6ef7676d7df53/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDc1YTIyNTI5ZDZlZjc2NzZkN2RmNTMiLCJpYXQiOjE2ODU0MzQyNjgsImV4cCI6MTY4NTY5MzQ2OH0.3VoagcR3vxO1R3PecoxIix_O8lkKUNKXzebRgP_65N4")
  //                 .send(data)
  //                 .end((err,res)=>{
  //                                     res.should.have.status(200);
  //                                     res.should.be.a("object");
  //                                     res.body.should.have.property("status_code")
  //                                     res.body.should.have.property("message").eq("Success");
  //                                    done()
  //                                 })
  //                         })

  // it("password and conformpasswornd are not same",(done)=>{
  //     const data={
  //         password:"Nc@1234",
  //         confirmPassword :"Nc@134"
  //     }
  //     chai.request(server)
  //     .post("/admin/user/reset-password/6475a22529d6ef7676d7df53/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDc1YTIyNTI5ZDZlZjc2NzZkN2RmNTMiLCJpYXQiOjE2ODU0MzQyNjgsImV4cCI6MTY4NTY5MzQ2OH0.3VoagcR3vxO1R3PecoxIix_O8lkKUNKXzebRgP_65N4")
  //     .send(data)
  //     .end((err,res)=>{
  //                         res.should.have.status(401);
  //                         res.should.be.a("object");
  //                         res.body.should.have.property("status_code")
  //                         res.body.should.have.property("message").eq("Password Or Confirm_Password Could Not Be Same");
  //                        done()
  //                     })
  //             })

  // it("paasword and confirmpassword are empty",(done)=>{
  //     const data={
  //         password:"",
  //         confirmPassword :""
  //     }
  //     chai.request(server)
  //     .post("/admin/user/reset-password/6475a22529d6ef7676d7df53/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDc1YTIyNTI5ZDZlZjc2NzZkN2RmNTMiLCJpYXQiOjE2ODU0MzQyNjgsImV4cCI6MTY4NTY5MzQ2OH0.3VoagcR3vxO1R3PecoxIix_O8lkKUNKXzebRgP_65N4")
  //     .send(data)
  //     .end((err,res)=>{
  //                         res.should.have.status(403);
  //                         res.should.be.a("object");
  //                         res.body.should.have.property("status_code")
  //                         res.body.should.have.property("message").eq("password and confirmPassword empty");
  //                        done()
  //                     })
  //             })

  // describe("verify otp",()=>{
  // it("verify otp",(done)=>{
  //         const data={
  //             userEmail:"kksdaamsscssujss@gmail.com",
  //             otp:"5531"
  //         }
  //         chai.request(server)
  //         .post("/admin/user/verifyOtp")
  //         .send(data)
  //         .end((err,res)=>{
  //                             res.should.have.status(200);
  //                             res.should.be.a("object");
  //                             res.body.should.have.property("status_code")
  //                             res.body.should.have.property("message").eq("Verify Otp Successfully");
  //                            done()
  //                         })
  //                 })

  //     it("verify otp",(done)=>{
  //         const data={
  //             userEmail:"kksdaamsssujss@gmail.com",
  //             otp:"5531"
  //         }
  //         chai.request(server)
  //         .post("/admin/user/verifyOtp")
  //         .send(data)
  //         .end((err,res)=>{
  //                             res.should.have.status(400);
  //                             res.should.be.a("object");
  //                             res.body.should.have.property("status_code")
  //                             res.body.should.have.property("message").eq("userEmail are incorrect");
  //                            done()
  //                         })
  //                 })

  //  })
  // describe("Edit profile pic",()=>{

  //     it("edit profile pic user",(done)=>{
  //                 const data={
  //                     userName:"ajay",
  //                     userEmail:"ajay@gmail.com",
  //                     profile_Pic:"/image_1685439270160.01.jpg.jpg"
  //                 }
  //                 chai.request(server)
  //                 .post("/admin/user/editProfile/6475a22b29d6ef7676d7df58")
  //                 .send(data)
  //                 .end((err,res)=>{
  //                                res.should.have.status(200);
  //                                     res.should.be.a("object");
  //                                     res.body.should.have.property("status_code")
  //                                     res.body.should.have.property("message").eq("Profile Updated");
  //                                    done()
  //                                 })

  //                         })
  // })
  //describe("user status Check",()=>{
  // it("user status check message success",(done)=>{
  //                     const data={
  //                         status:"false"
  //                     }
  //                     chai.request(server)
  //                     .post("/admin/user/checkStatus/6475a22b29d6ef7676d7df58")
  //                     .send(data)
  //                     .end((err,res)=>{
  //                                    res.should.have.status(200);
  //                                         res.should.be.a("object");
  //                                         res.body.should.have.property("status_code")
  //                                         res.body.should.have.property("message").eq("Success");
  //                                        done()
  //                                     })

  //                             })

  // it("user status check message Failed",(done)=>{
  //     const data={
  //         status:""
  //     }
  //     chai.request(server)
  //     .post("/admin/user/checkStatus/6475a22b29d6ef7676d7df58")
  //     .send(data)
  //     .end((err,res)=>{
  //                    res.should.have.status(400);
  //                         res.should.be.a("object");
  //                         res.body.should.have.property("status_code")
  //                         res.body.should.have.property("message").eq("Failed");
  //                        done()
  //                     })

  //  })

  // describe("user list Check",()=>{
  //     it("user list check status success",(done)=>{
  //             const data={
  //                 page:"3",
  //                 userName:"a",
  //                 pageSize:"4"
  //             }
  //             chai.request(server)
  //             .post("/admin/user/userList")
  //             .send(data)
  //             .end((err,res)=>{
  //                            res.should.have.status(200);
  //                                 res.should.be.a("object");
  //                                 res.body.should.have.property("status_code")
  //                                 res.body.should.have.property("message").eq("Success");
  //                                done()
  //                             })

  //               })
  //   describe("user details Check", () => {
  //     it("user details check status success",(done)=>{

  //                     chai.request(server)
  //                     .post("/admin/user/details/6465ed9b8ddefe195c0b6ee8")
  //                     .send()
  //                     .end((err,res)=>{
  //                                    res.should.have.status(200);
  //                                         res.should.be.a("object");
  //                                         res.body.should.have.property("status_code")
  //                                         res.body.should.have.property("message").eq("Success");
  //                                        done()
  //                                     })
  // });
  // it("user details check Failed message",(done)=>{

  //     chai.request(server)
  //     .post("/admin/user/details/6465ed9b8ddefe195c0b6ee")
  //     .send()
  //     .end((err,res)=>{
  //                    res.should.have.status(400);
  //                         res.should.be.a("object");
  //                         res.body.should.have.property("status_code")
  //                         res.body.should.have.property("message").eq("Failed");
  //                        done()
  //                     })
  // });
  describe("check category ", () => {
    // it("category success message ",(done)=>{
    //     const data={
    //         categoryName:"samsung",
    //         categoryPic:"/image_1685443070172.01.jpg.jpg",
    //     }

    //         chai.request(server)
    //         .post("/admin/category/category/create")
    //         .send(data)
    //         .end((err,res)=>{
    //                        res.should.have.status(201);
    //                             res.should.be.a("object");
    //                             res.body.should.have.property("status_code")
    //                             res.body.should.have.property("message").eq("Category Create Successfully");
    //                            done()
    //                         })
    //     });
    //  it("check category list  ",(done)=>{

    //         chai.request(server)
    //         .post("/admin/category/category/list")
    //         .send()
    //         .end((err,res)=>{
    //                        res.should.have.status(200);
    //                             res.should.be.a("object");
    //                             res.body.should.have.property("status_code")
    //                             res.body.should.have.property("message").eq("Success");
    //                            done()
    //                         })
    //   });
    //     it("search category check  ",(done)=>{
    //        const data={
    //         categoryName:"s"
    //        }
    //         chai.request(server)
    //         .post("/admin/category/category/search-category")
    //         .send(data)
    //         .end((err,res)=>{
    //                        res.should.have.status(200);
    //                             res.should.be.a("object");
    //                             res.body.should.have.property("status_code")
    //                             res.body.should.have.property("message").eq("Success");
    //                            done()
    //                         })
    //   });
    // it("update  category check  ",(done)=>{
    //            const data={
    //             categoryName:"samsung"
    //            }
    //             chai.request(server)
    //             .patch("/admin/category/category/update/644f496426d12cdc4b7278b9")
    //             .send(data)
    //             .end((err,res)=>{
    //                            res.should.have.status(200);
    //                                 res.should.be.a("object");
    //                                 res.body.should.have.property("status_code")
    //                                 res.body.should.have.property("message").eq("Success");
    //                                done()
    //                             })
    //       });
    // it("  category status  check  ",(done)=>{
    //     const data={
    //      status:"false"
    //     }
    //      chai.request(server)
    //      .post("/admin/category/category/checkstatus/642a5a295c7827c6d6b00f7f")
    //      .send(data)
    //      .end((err,res)=>{
    //                     res.should.have.status(200);
    //                          res.should.be.a("object");
    //                          res.body.should.have.property("status_code")
    //                          res.body.should.have.property("message").eq("Success");
    //                         done()
    //                      })
    // });
    // it("  category failed message check  ",(done)=>{
    //     const data={
    //      status:""
    //     }
    //      chai.request(server)
    //      .post("/admin/category/category/checkstatus/642a5a295c7827c6d6b00f7f")
    //      .send(data)
    //      .end((err,res)=>{
    //                     res.should.have.status(400);
    //                          res.should.be.a("object");
    //                          res.body.should.have.property("status_code")
    //                          res.body.should.have.property("message").eq("Failed");
    //                         done()
    //                      })
    // });
    // it("check subCategory Status  ",(done)=>{
    //      chai.request(server)
    //      .post("/admin/category/category/sub/642a5a295c7827c6d6b00f7f")
    //      .send()
    //      .end((err,res)=>{
    //                     res.should.have.status(200);
    //                          res.should.be.a("object");
    //                          res.body.should.have.property("status_code")
    //                          res.body.should.have.property("message").eq("Success");
    //                         done()
    //                      })
    // });
    // it("check subCategory failed message  ",(done)=>{
    //     chai.request(server)
    //     .post("/admin/category/category/sub/642a5a295c7827c6d6b00f")
    //     .send()
    //     .end((err,res)=>{
    //                    res.should.have.status(400);
    //                         res.should.be.a("object");
    //                         res.body.should.have.property("status_code")
    //                         res.body.should.have.property("message").eq("Failed");
    //                        done()
    //                     })
    // });
    // it("check subCategory success message  ",(done)=>{
    //     const data={
    //         subCategoryName:"vivo",
    //         category_Id:"644f496426d12cdc4b7278b9"
    //     }
    //         chai.request(server)
    //         .post("/admin/category/subCategory/createSubCategory")
    //         .send(data)
    //         .end((err,res)=>{
    //                        res.should.have.status(200);
    //                             res.should.be.a("object");
    //                             res.body.should.have.property("status_code")
    //                             res.body.should.have.property("message").eq("Success");
    //                            done()
    //                         })
    //     })
    // it("check subCategory Failed  message  ",(done)=>{
    //     const data={
    //         subCategoryName:"",
    //         category_Id:""
    //     }
    //         chai.request(server)
    //         .post("/admin/category/subCategory/createSubCategory")
    //         .send(data)
    //         .end((err,res)=>{
    //                        res.should.have.status(400);
    //                             res.should.be.a("object");
    //                             res.body.should.have.property("status_code")
    //                             res.body.should.have.property("message").eq("Failed");
    //                            done()
    //                         })
    //     })
    // it("check subCategory list success  message  ",(done)=>{
    //             chai.request(server)
    //             .post("/admin/category/subCategory/SubCategoryList")
    //             .send()
    //             .end((err,res)=>{
    //                            res.should.have.status(200);
    //                                 res.should.be.a("object");
    //                                 res.body.should.have.property("status_code")
    //                                 res.body.should.have.property("message").eq("Success");
    //                                done()
    //                             })
    //         })
    // it("check subCategory updated success  message  ",(done)=>{
    //     const data={
    //         subCategoryName:"midd"
    //     }
    //                 chai.request(server)
    //                 .patch("/admin/category/subCategory/subCategoryUpdate/642a5ae91b8de6ebd2649e11")
    //                 .send(data)
    //                 .end((err,res)=>{
    //                                res.should.have.status(200);
    //                                     res.should.be.a("object");
    //                                     res.body.should.have.property("status_code")
    //                                     res.body.should.have.property("message").eq("Success");
    //                                    done()
    //                                 })
    //             })
    // it("check subCategory search success  message  ",(done)=>{
    //     const data={
    //         subCategoryName:"v"
    //     }
    //                 chai.request(server)
    //                 .post("/admin/category/subCategory/subCategorySearch")
    //                 .send(data)
    //                 .end((err,res)=>{
    //                                res.should.have.status(200);
    //                                     res.should.be.a("object");
    //                                     res.body.should.have.property("status_code")
    //                                     res.body.should.have.property("message").eq("Success");
    //                                    done()
    //                                 })
    //             })
    // it("check Category list success  message  ",(done)=>{

    //                 chai.request(server)
    //                 .post("/admin/category/subCategory/selectCategory")
    //                 .send()
    //                 .end((err,res)=>{
    //                                res.should.have.status(200);
    //                                     res.should.be.a("object");
    //                                     res.body.should.have.property("status_code")
    //                                     res.body.should.have.property("message").eq("Success");
    //                                    done()
    //                                 })
    //             })
    // it("check subSubCategory list success  message  ",(done)=>{

    //                     chai.request(server)
    //                     .post("/admin/category/subCategory/checkSubSubCategory/642a5ae91b8de6ebd2649e11")
    //                     .send()
    //                     .end((err,res)=>{
    //                                    res.should.have.status(200);
    //                                         res.should.be.a("object");
    //                                         res.body.should.have.property("status_code")
    //                                         res.body.should.have.property("message").eq("Success");
    //                                        done()
    //                                     })
    //                 })
    // it("check subSubCategory  success  message  ",(done)=>{
    //     const data={
    //         subSubCategoryName:"L.G TV 12",
    //         category_Id:"642a5a295c7827c6d6b00f7f",
    //         subCategory_Id:"642a5ae91b8de6ebd2649e11"
    //     }

    //     chai.request(server)
    //     .post("/admin/category/subSubCategory/createSubSubCategory")
    //     .send()
    //     .end((err,res)=>{
    //                    res.should.have.status(200);
    //                         res.should.be.a("object");
    //                         res.body.should.have.property("status_code")
    //                         res.body.should.have.property("message").eq("Success");
    //                        done()
    //                     })
    // })
    // it("check subSubCategory list  success  message  ",(done)=>{

    //     chai.request(server)
    //     .post("/admin/category/subSubCategory/subSubCategoryList")
    //     .send()
    //     .end((err,res)=>{
    //                    res.should.have.status(200);
    //                         res.should.be.a("object");
    //                         res.body.should.have.property("status_code")
    //                         res.body.should.have.property("message").eq("Success");
    //                        done()
    //                     })
    // })
    // it("check subSubCategory update  success  message  ",(done)=>{
    // const data={
    //     subSubCategoryName:"L.G TV 12",
    // }

    //     chai.request(server)
    //     .patch("/admin/category/subSubCategory/subSubCategoryUpdate/640ebde65e4ac49141265c5e")
    //     .send(data)
    //     .end((err,res)=>{
    //                    res.should.have.status(200);
    //                         res.should.be.a("object");
    //                         res.body.should.have.property("status_code")
    //                         res.body.should.have.property("message").eq("Success");
    //                        done()
    //                     })
    // })
    // it("check subSubCategory search  success  message  ",(done)=>{
    //     const data={
    //         subSubCategoryName:"L.G TV 12",
    //     }

    //         chai.request(server)
    //         .patch("/admin/category/subSubCategory/subSubCategorySearch")
    //         .send(data)
    //         .end((err,res)=>{
    //                        res.should.have.status(200);
    //                             res.should.be.a("object");
    //                             res.body.should.have.property("status_code")
    //                             res.body.should.have.property("message").eq("Success");
    //                            done()
    //                         })
    //     })
    // it("check Category   success  message  ",(done)=>{

    //         chai.request(server)
    //         .post("/admin/category/subSubCategory/selectCategory")
    //         .send()
    //         .end((err,res)=>{
    //                        res.should.have.status(200);
    //                             res.should.be.a("object");
    //                             res.body.should.have.property("status_code")
    //                             res.body.should.have.property("message").eq("Success");
    //                            done()
    //                         })
    //     })
    // it("check subCategory   success  message  ",(done)=>{

    //     chai.request(server)
    //     .post("/admin/category/subSubCategory/selectSubCategory")
    //     .send()
    //     .end((err,res)=>{
    //                    res.should.have.status(200);
    //                         res.should.be.a("object");
    //                         res.body.should.have.property("status_code")
    //                         res.body.should.have.property("message").eq("Success");
    //                        done()
    //                     })
    // })
    // it("check attribute   success  message  ",(done)=>{

    //     chai.request(server)
    //     .post("/admin/category/subSubCategory/checkAttribute/640ebde65e4ac49141265c5e")
    //     .send()
    //     .end((err,res)=>{
    //                    res.should.have.status(200);
    //                         res.should.be.a("object");
    //                         res.body.should.have.property("status_code")
    //                         res.body.should.have.property("message").eq("Success");
    //                        done()
    //                     })
    // })
    //         it("check attribute   success  message  ",(done)=>{

    //             const data={
    //                 attributeName:"Iphone",
    // category_Id:"642a5a295c7827c6d6b00f7f",
    // subCategory_Id:"642a5ae91b8de6ebd2649e11",
    // subSubCategory_Id:"642a5bc31b8de6ebd2649e1d"
    //             }
    //             chai.request(server)
    //             .post("/admin/category/attribute/createAttribute")
    //             .send(data)
    //             .end((err,res)=>{
    //                            res.should.have.status(200);
    //                                 res.should.be.a("object");
    //                                 res.body.should.have.property("status_code")
    //                                 res.body.should.have.property("message").eq("Success");
    //                                done()
    //                             })
    //         })
    // it("check attribute List success  message  ",(done)=>{

    //     chai.request(server)
    //     .post("/admin/category/attribute/attributeList")
    //     .send()
    //     .end((err,res)=>{
    //                    res.should.have.status(200);
    //                         res.should.be.a("object");
    //                         res.body.should.have.property("status_code")
    //                         res.body.should.have.property("message").eq("Success");
    //                        done()
    //                     })
    // })
    //  it("check attribute search success  message  ",(done)=>{

    //     const data={
    //  attritubeName:"mi"
    //     }
    //      chai.request(server)
    //      .patch("/admin/category/attribute/attributeUpdate/640eb6873f933ae4dbc3ceee")
    //      .send(data)
    //      .end((err,res)=>{
    //                     res.should.have.status(200);
    //                          res.should.be.a("object");
    //                          res.body.should.have.property("status_code")
    //                          res.body.should.have.property("message").eq("Success");
    //                         done()
    //                      })
    //  })
    // it("check product add  success  message  ",(done)=>{

    //        const data={
    //          productName:"nothing phone 1",
    //          slug:"www./example/nmk",
    //          Description:"check product add  success  message ",
    //          shortDescription:"check product add  success  message ",
    //          Price:"90000",
    //          SKU:"ke-003",
    //          stockQuantity:"3",
    //          oldPrice:"87000",
    //          pageTitle:"check product add  success  message ",
    //          metaDescription:"check product add  success  message ",
    //          visibility:"hide",
    //          publishDate:"23/4/2023",
    //          Tags:"meta",
    //          Discount:"30",
    //          product_Pic:"/image_1685443070172.01.jpg.jpg",
    //          category_Id:"644f499f26d12cdc4b7278bb"

    //        }
    //         chai.request(server)
    //         .post("/admin/product/createProduct")
    //         .send(data)
    //         .end((err,res)=>{
    //                        res.should.have.status(201);
    //                             res.should.be.a("object");
    //                             res.body.should.have.property("status_code")
    //                             res.body.should.have.property("message").eq("Success");
    //                            done()
    //                         })
    //     })
    // it("check product list  success  message  ",(done)=>{
    //     chai.request(server)
    //     .post("/admin/product/productList")
    //     .send()
    //     .end((err,res)=>{
    //                    res.should.have.status(200);
    //                         res.should.be.a("object");
    //                         res.body.should.have.property("status_code")
    //                         res.body.should.have.property("message").eq("Success");
    //                        done()
    //                     })
    // })
    //    it("check product updated success  message  ",(done)=>{
    //       const data={
    //          productName:"nothing  1",
    //       }
    //       chai.request(server)
    //       .patch("/admin/product/updateProduct/6464641e77ddb0934f3aa516")
    //       .send(data)
    //       .end((err,res)=>{
    //                      res.should.have.status(200);
    //                           res.should.be.a("object");
    //                           res.body.should.have.property("status_code")
    //                           res.body.should.have.property("message").eq("Success");
    //                          done()
    //                       })
    //   })
    // it("check product search success  message  ",(done)=>{
    //    const data={
    //       productName:"n",
    //    }
    //    chai.request(server)
    //    .post("/admin/product/productSearch")
    //    .send(data)
    //    .end((err,res)=>{
    //                   res.should.have.status(200);
    //                        res.should.be.a("object");
    //                        res.body.should.have.property("status_code")
    //                        res.body.should.have.property("message").eq("Success");
    //                       done()
    //                    })
    // })
    // it("check contact  success  message  ",(done)=>{
    //    const data={
    //       userName:"Ajay Sharma",
    //     Email:"ajay12@gmail.com",
    //     subject:"Lorem ipsum",
    //     description:"Lorem ipsum dolor sit amet consectetur"
    //    }
    //    chai.request(server)
    //    .post("/admin/contact/contact/createContact")
    //    .send(data)
    //    .end((err,res)=>{
    //                   res.should.have.status(201);
    //                        res.should.be.a("object");
    //                        res.body.should.have.property("status_code")
    //                        res.body.should.have.property("message").eq("Success");
    //                       done()
    //                    })
    // })
    // it("check contact  success  message  ",(done)=>{
    //    chai.request(server)
    //    .post("/admin/contact/contact/contactList")
    //    .send()
    //    .end((err,res)=>{
    //                   res.should.have.status(200);
    //                        res.should.be.a("object");
    //                        res.body.should.have.property("status_code")
    //                        res.body.should.have.property("message").eq("Success");
    //                       done()
    //                    })
    // })
    // it("check contact  success  message  ",(done)=>{
    //    chai.request(server)
    //    .post("/admin/contact/contact/contactView/644a2501ef9239cf29a15d06")
    //    .send()
    //    .end((err,res)=>{
    //                   res.should.have.status(200);
    //                        res.should.be.a("object");
    //                        res.body.should.have.property("status_code")
    //                        res.body.should.have.property("message").eq("Success");
    //                       done()
    //                    })
    // })
    // it("check contact  success  message  ",(done)=>{
    //    chai.request(server)
    //    .post("/admin/contact/contact/contactView/644a2501ef9239cf29a15d06")
    //    .send()
    //    .end((err,res)=>{
    //                   res.should.have.status(200);
    //                        res.should.be.a("object");
    //                        res.body.should.have.property("status_code")
    //                        res.body.should.have.property("message").eq("Success");
    //                       done()
    //                    })
    // })
    // it("check staff add  success  message  ",(done)=>{
    // const data={

    //    staffName:"vjay Sharma",
    // userEmail:"ajay12@gmail.com",
    // modules:"Lorem ipsum",
    // password:"ajay@00123",
    // confirm_password:"ajay@00123"
    // }
    //    chai.request(server)
    //    .post("/admin/staff/staff/createStaff")
    //    .send(data)
    //    .end((err,res)=>{
    //                   res.should.have.status(200);
    //                        res.should.be.a("object");
    //                        res.body.should.have.property("status_code")
    //                        res.body.should.have.property("message").eq("Success");
    //                       done()
    //                    })
    // })
    // it("check staff add  success  message  ",(done)=>{

    //       chai.request(server)
    //       .post("/admin/staff/staff/list")
    //       .send()
    //       .end((err,res)=>{
    //                      res.should.have.status(200);
    //                           res.should.be.a("object");
    //                           res.body.should.have.property("status_code")
    //                           res.body.should.have.property("message").eq("Success");
    //                          done()
    //                       })
    //    })
    // it("check staff search  success  message  ",(done)=>{
    // const data={
    //    staffName:"vijay",
    // }
    //    chai.request(server)
    //    .patch("/admin/staff/staff/updateStaff/643f9caa63c68a49553ca615")
    //    .send(data)
    //    .end((err,res)=>{
    //                   res.should.have.status(200);
    //                        res.should.be.a("object");
    //                        res.body.should.have.property("status_code")
    //                        res.body.should.have.property("message").eq("Success");
    //                       done()
    //                    })
    // })
    // it("check content add  success  message  ",(done)=>{
    //    const data={
    //       title:"Your Safety Matters to Us",
    //       Description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    //    }
    //       chai.request(server)
    //       .post("/admin/content/content/createContent")
    //       .send(data)
    //       .end((err,res)=>{
    //                      res.should.have.status(201);
    //                           res.should.be.a("object");
    //                           res.body.should.have.property("status_code")
    //                           res.body.should.have.property("message").eq("Success");
    //                          done()
    //                       })
    //    })
    // it("check content list  success  message  ",(done)=>{

    //       chai.request(server)
    //       .post("/admin/content/content/list")
    //       .send()
    //       .end((err,res)=>{
    //                      res.should.have.status(200);
    //                           res.should.be.a("object");
    //                           res.body.should.have.property("status_code")
    //                           res.body.should.have.property("message").eq("Success");
    //                          done()
    //                       })
    //    })
    // it("check content updated  success  message  ",(done)=>{
    //    const data={
    //       title:"Your Safety ",
    //    }
    //    chai.request(server)
    //    .patch("/admin/content/content/updateContent/644a08dc84ab4b696d963b42")
    //    .send(data)
    //    .end((err,res)=>{
    //                   res.should.have.status(200);
    //                        res.should.be.a("object");
    //                        res.body.should.have.property("status_code")
    //                        res.body.should.have.property("message").eq("Update Successfull");
    //                       done()
    //                    })
    // })
    // it("check thougth   success  message  ",(done)=>{
    //    const data={
    //       title:"New Thought",
    //     description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi laboriosam minima pariatur quod illo a enim ut officia porro ipsa? Quod,",
    //     user_Id:"644b5da7a96eb544042252f5"
    //    }
    //    chai.request(server)
    //    .post("/admin/thougth/thougth/createThougth")
    //    .send(data)
    //    .end((err,res)=>{
    //                   res.should.have.status(201);
    //                        res.should.be.a("object");
    //                        res.body.should.have.property("status_code")
    //                        res.body.should.have.property("message").eq("Success");
    //                       done()
    //                    })
    // })
    // it("check thougth   success  message  ",(done)=>{

    //    chai.request(server)
    //    .post("/admin/thougth/thougth/list")
    //    .send()
    //    .end((err,res)=>{
    //                   res.should.have.status(200);
    //                        res.should.be.a("object");
    //                        res.body.should.have.property("status_code")
    //                        res.body.should.have.property("message").eq("Success");
    //                       done()
    //                    })
    // })
    // it("check thougth updated   success  message  ",(done)=>{
    // const data={
    //    title:"z",
    // }
    //    chai.request(server)
    //    .post("/admin/thougth/thougth/thougthSearch")
    //    .send(data)
    //    .end((err,res)=>{
    //                   res.should.have.status(200);
    //                        res.should.be.a("object");
    //                        res.body.should.have.property("status_code")
    //                        res.body.should.have.property("message").eq("Success");
    //                       done()
    //                    })
    // })
    // it("check coupan    success  message  ",(done)=>{
    //    const data={
    //       coupanTitle:"Holi",
    //       coupanCode:"25753411",
    //       startDate:"12/0/2023",
    //       endDate:"12/4/2023",
    //       Quantity:"12",
    //       DiscountType:"40"
    //    }
    //       chai.request(server)
    //       .post("/admin/coupan/coupan/create")
    //       .send(data)
    //       .end((err,res)=>{
    //                      res.should.have.status(200);
    //                           res.should.be.a("object");
    //                           res.body.should.have.property("status_code")
    //                           res.body.should.have.property("message").eq("Success");
    //                          done()
    //                       })
    //    })
    // it("check coupan  list  success  message  ",(done)=>{
    //     chai.request(server)
    //       .post("/admin/coupan/coupan/list")
    //       .send()
    //       .end((err,res)=>{
    //                      res.should.have.status(200);
    //                           res.should.be.a("object");
    //                           res.body.should.have.property("status_code")
    //                           res.body.should.have.property("message").eq("Success");
    //                          done()
    //                       })
    //    })
    // it("check information   success  message  ",(done)=>{
    //    const data={
    //       title:"The Price is Fixed",
    //       Description:"Lorem ipsum dolor sit amet consectetur adipisicing elit"
    //    }
    //    chai.request(server)
    //      .post("/admin/information/info/create")
    //      .send(data)
    //      .end((err,res)=>{
    //                     res.should.have.status(200);
    //                          res.should.be.a("object");
    //                          res.body.should.have.property("status_code")
    //                          res.body.should.have.property("message").eq("Success");
    //                         done()
    //                      })
    //   })
    // it("check information list   success  message  ",(done)=>{

    //    chai.request(server)
    //      .post("/admin/information/info/list")
    //      .send()
    //      .end((err,res)=>{
    //                     res.should.have.status(200);
    //                          res.should.be.a("object");
    //                          res.body.should.have.property("status_code")
    //                          res.body.should.have.property("message").eq("Success");
    //                         done()
    //                      })
    //   })
    // it("check information list   success  message  ",(done)=>{
    //    const data={
    //       title:"The Price ",
    //    }
    //    chai.request(server)
    //      .patch("/admin/information/info/update/645b264546220117acacc24c")
    //      .send(data)
    //      .end((err,res)=>{
    //                     res.should.have.status(200);
    //                          res.should.be.a("object");
    //                          res.body.should.have.property("status_code")
    //                          res.body.should.have.property("message").eq("Success");
    //                         done()
    //                      })
    //   })
    // it("check information updated  success  message  ",(done)=>{
    //    const data={
    //       title:"The Price "
    //    }
    //    chai.request(server)
    //      .patch("/admin/information/info/update/645b264546220117acacc24c")
    //      .send(data)
    //      .end((err,res)=>{
    //                     res.should.have.status(200);
    //                          res.should.be.a("object");
    //                          res.body.should.have.property("status_code")
    //                          res.body.should.have.property("message").eq("Success");
    //                         done()
    //                      })
    //   })
   //  it("check reporter add  success  message  ", (done) => {
   //    const data = {
   //       reporter:"Ajay Sharma",
   //       reporterAgainst:"Ram Jain",
   //       reason:"Inappropriate",
   //       user_Id:"64071e76c48fc51f95a1f0fc",
   //       product_Id:"643f80919739c5abea0c8573"
   //    };
   //    chai
   //      .request(server)
   //      .post("/admin/reporter/reporter/createReporter")
   //      .send(data)
   //      .end((err, res) => {
   //        res.should.have.status(200);
   //        res.should.be.a("object");
   //        res.body.should.have.property("status_code");
   //        res.body.should.have.property("message").eq("Success");
   //        done();
   //      });
   //  });
   //  it("check  reporter list  success  message  ",(done)=>{ 
    
   //    chai.request(server)
   //      .post("/admin/reporter/reporter/list")
   //      .send()
   //      .end((err,res)=>{
   //                     res.should.have.status(200);
   //                          res.should.be.a("object");
   //                          res.body.should.have.property("status_code")
   //                          res.body.should.have.property("message").eq("Success");
   //                         done()
   //                      })
   //   })
   // it("check  reporter user view  success  message  ",(done)=>{ 
    
   //    chai.request(server)
   //      .post("/admin/reporter/reporter/userView/64071e76c48fc51f95a1f0fc")
   //      .send()
   //      .end((err,res)=>{
   //                     res.should.have.status(200);
   //                          res.should.be.a("object");
   //                          res.body.should.have.property("status_code")
   //                          res.body.should.have.property("message").eq("Success");
   //                         done()
   //                      })
   //   })
   // it("check  reporter product view  success  message  ",(done)=>{ 
    
   //    chai.request(server)
   //      .post("/admin/reporter/reporter/productView/643f80919739c5abea0c8573")
   //      .send()
   //      .end((err,res)=>{
   //                     res.should.have.status(200);
   //                          res.should.be.a("object");
   //                          res.body.should.have.property("status_code")
   //                          res.body.should.have.property("message").eq("Success");
   //                         done()
   //                      })
   //   })
   // it("check  dashboard  user count success  message  ",(done)=>{ 
    
   //    chai.request(server)
   //      .post("/admin/dashboards/count/userCount")
   //      .send()
   //      .end((err,res)=>{
   //                     res.should.have.status(200);
   //                          res.should.be.a("object");
   //                          res.body.should.have.property("status_code")
   //                          res.body.should.have.property("message").eq("Success");
   //                         done()
   //                      })
   //   })
   // it("check  dashboard  search order success  message  ",(done)=>{ 
   //  const data={
   //    sellerName:"a"
   //  }
   //    chai.request(server)
   //      .post("/admin/dashboards/count/search")
   //      .send(data)
   //      .end((err,res)=>{
   //                     res.should.have.status(200);
   //                          res.should.be.a("object");
   //                          res.body.should.have.property("status_code")
   //                          res.body.should.have.property("message").eq("Success");
   //                         done()
   //                      })
   //   })
   // it("check  dashboard   order details success  message  ",(done)=>{ 
     
   //      chai.request(server)
   //        .post("/admin/dashboards/count/orderDetails/644662f03d661d05471aff40")
   //        .send()
   //        .end((err,res)=>{
   //                       res.should.have.status(200);
   //                            res.should.be.a("object");
   //                            res.body.should.have.property("status_code")
   //                            res.body.should.have.property("message").eq("Success");
   //                           done()
   //                        })
   //     })
   // it("check  help success  message  ",(done)=>{ 
   //   const data={
   //    categoryName:"Mobile",
   //    subCategoryName:"oppo 11 pro max"
   //   }
   //    chai.request(server)
   //      .post("/admin/help/help/createHelp")
   //      .send(data)
   //      .end((err,res)=>{
   //                     res.should.have.status(201);
   //                          res.should.be.a("object");
   //                          res.body.should.have.property("status_code")
   //                          res.body.should.have.property("message").eq("Success");
   //                         done()
   //                      })
   //   })
   // it("check  help list success  message  ",(done)=>{ 
    
   //     chai.request(server)
   //       .post("/admin/help/help/list")
   //       .send()
   //       .end((err,res)=>{
   //                      res.should.have.status(200);
   //                           res.should.be.a("object");
   //                           res.body.should.have.property("status_code")
   //                           res.body.should.have.property("message").eq("Success");
   //                          done()
   //                       })
   //    })
   // it("check  help search success  message  ",(done)=>{ 
   //  const data={
   //    categoryName:"m"
   //  }
   //    chai.request(server)
   //      .post("/admin/help/help/helpSearch")
   //      .send(data)
   //      .end((err,res)=>{
   //                     res.should.have.status(200);
   //                          res.should.be.a("object");
   //                          res.body.should.have.property("status_code")
   //                          res.body.should.have.property("message").eq("Success");
   //                         done()
   //                      })
   //   })
   // it("check  help question success  message  ",(done)=>{ 
   //    const data={
   //       Question:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
   //       Answer:"Lorem ipsum dolor sit amet consectetur, adipisicing elit"
   //    }
   //      chai.request(server)
   //        .post("/admin/help/help/createQuestion")
   //        .send(data)
   //        .end((err,res)=>{
   //                       res.should.have.status(201);
   //                            res.should.be.a("object");
   //                            res.body.should.have.property("status_code")
   //                            res.body.should.have.property("message").eq("Success");
   //                           done()
   //                        })
   //     })
   // it("check  help question list success  message  ",(done)=>{ 
     
   //      chai.request(server)
   //        .post("/admin/help/help/questionList")
   //        .send(  )
   //        .end((err,res)=>{
   //                       res.should.have.status(200);
   //                            res.should.be.a("object");
   //                            res.body.should.have.property("status_code")
   //                            res.body.should.have.property("message").eq("Success");
   //                           done()
   //                        })
   //     })
   // it("check  help question update success  message  ",(done)=>{ 
   //   const data={
   //    Question:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
   //    Answer:"Lorem ipsum dolor sit amet consectetur"
   //   }
   //    chai.request(server)
   //      .patch("/admin/help/help/updateQuestion/644b976b49aa1d028dd06b5e")
   //      .send(data)
   //      .end((err,res)=>{
   //                     res.should.have.status(200);
   //                          res.should.be.a("object");
   //                          res.body.should.have.property("status_code")
   //                          res.body.should.have.property("message").eq("Success");
   //                         done()
   //                      })
   //   })
   // it("check  announcement success  message  ",(done)=>{ 
   //    const data={
   //       heading:"Announcement Heading",
   //       pic:"/image_1685524832402.01.jpg.jpg",
   //       text:"Lorem ipsum, dolor sit amet consectetur adipisicing elit",   
   //    }
   //     chai.request(server)
   //       .post("/admin/announcement/announcement/create")
   //       .send(data)
   //       .end((err,res)=>{
   //                      res.should.have.status(200);
   //                           res.should.be.a("object");
   //                           res.body.should.have.property("status_code")
   //                           res.body.should.have.property("message").eq("Success");
   //                          done()
   //                       })
   //    })
   // it("check  announcement list success  message  ",(done)=>{ 
   
   //     chai.request(server)
   //       .post("/admin/announcement/announcement/list")
   //       .send()
   //       .end((err,res)=>{
   //                      res.should.have.status(200);
   //                           res.should.be.a("object");
   //                           res.body.should.have.property("status_code")
   //                           res.body.should.have.property("message").eq("Success");
   //                          done()
   //                       })
   //    })
   // it("check  announcement search success  message  ",(done)=>{ 
   //    const data={
   //       heading:"a"
   //    }
   //    chai.request(server)
   //      .post("/admin/announcement/announcement/search")
   //      .send(data)
   //      .end((err,res)=>{
   //                     res.should.have.status(200);
   //                          res.should.be.a("object");
   //                          res.body.should.have.property("status_code")
   //                          res.body.should.have.property("message").eq("Success");
   //                         done()
   //                      })
   //   })
   // it("check  announcement search success  message  ",(done)=>{ 
   //    const data={
   //       heading:"a"
   //    }
   //    chai.request(server)
   //      .post("/admin/announcement/announcement/search")
   //      .send(data)
   //      .end((err,res)=>{
   //                     res.should.have.status(200);
   //                          res.should.be.a("object");
   //                          res.body.should.have.property("status_code")
   //                          res.body.should.have.property("message").eq("Success");
   //                         done()
   //                      })
   //   })
   // it("check  announcement add  success  message  ",(done)=>{ 
   //       const data={
   //          sellerName:"ajay sharma",
   //          buyerName:"Ram Jain",
   //          mobileNumber:"9116472181",
   //          offerType:"Free",
   //          price:"1000Sar",
   //          product_Id:"64460b7045a0a6fea4745601"
   //       }
   //       chai.request(server)
   //         .post("/admin/order/order/createOrder")
   //         .send(data)
   //         .end((err,res)=>{
   //                        res.should.have.status(200);
   //                             res.should.be.a("object");
   //                             res.body.should.have.property("status_code")
   //                             res.body.should.have.property("message").eq("Success");
   //                            done()
   //                         })
   //      })

  });
  describe("check user management ", () => {
   // it("check user signup success  message  ",(done)=>{ 
   //          const data={
   //             userName: "ajay patidar",
   //             userEmail: "nareendracharan25753@gmail.com",
   //             password:"Nc@25753"
   //          }
   //          chai.request(server)
   //            .post("/user/user/user/signup")
   //            .send(data)
   //            .end((err,res)=>{
   //                           res.should.have.status(201);
   //                                res.should.be.a("object");
   //                                res.body.should.have.property("status_code")
   //                                res.body.should.have.property("message").eq("userSignup Successfully");
   //                               done()
   //                            })
   //         })
         //   it("check user login success message  ",(done)=>{ 
         //    const data={
              
         //       userEmail: "nareendracharan25753@gmail.com",
         //       password:"Nc@25753"
         //    }
         //    chai.request(server)
         //      .post("/user/user/user/login")
         //      .send(data)
         //      .end((err,res)=>{
         //                     res.should.have.status(201);
         //                          res.should.be.a("object");
         //                          res.body.should.have.property("status_code")
         //                          res.body.should.have.property("message").eq("login SuccessFully");
         //                         done()
         //                      })
         //   })
         // it("check user login incorrect password message  ",(done)=>{ 
         //    const data={
              
         //       userEmail: "nareendracharan25753@gmail.com",
         //       password:"Nc@2553"
         //    }
         //    chai.request(server)
         //      .post("/user/user/user/login")
         //      .send(data)
         //      .end((err,res)=>{
         //                     res.should.have.status(403);
         //                          res.should.be.a("object");
         //                          res.body.should.have.property("status_code")
         //                          res.body.should.have.property("message").eq("User Password Are Incorrect");
         //                         done()
         //                      })
         //   })
         // it("check user login incorrect Email message  ",(done)=>{ 
         //    const data={
              
         //       userEmail: "nareendracharn25753@gmail.com",
         //       password:"Nc@2553"
         //    }
         //    chai.request(server)
         //      .post("/user/user/user/login")
         //      .send(data)
         //      .end((err,res)=>{
         //                     res.should.have.status(403);
         //                          res.should.be.a("object");
         //                          res.body.should.have.property("status_code")
         //                          res.body.should.have.property("message").eq("User Email Are Incorrect");
         //                         done()
         //                      })
         //   })
         // it("check user login empty filed message  ",(done)=>{ 
         //    const data={
              
         //       userEmail: "",
         //       password:""
         //    }
         //    chai.request(server)
         //      .post("/user/user/user/login")
         //      .send(data)
         //      .end((err,res)=>{
         //                     res.should.have.status(403);
         //                          res.should.be.a("object");
         //                          res.body.should.have.property("status_code")
         //                          res.body.should.have.property("message").eq("User Email and Password Are empty");
         //                         done()
         //                      })
         //   })
         // it("check send mail for reset password message  ",(done)=>{ 
         //    const data={
              
         //       userEmail: "narendracharan25753@gmail.com",
             
         //    }
         //    chai.request(server)
         //      .post("/user/user/user/send-mail")
         //      .send(data)
         //      .end((err,res)=>{
         //                     res.should.have.status(200);
         //                          res.should.be.a("object");
         //                          res.body.should.have.property("status_code")
         //                          res.body.should.have.property("message").eq("Mail Send Successfully");
         //                         done()
         //                      })
         //   })
         // it("check user email are empty message  ",(done)=>{ 
         //    const data={
              
         //       userEmail: "",
             
         //    }
         //    chai.request(server)
         //      .post("/user/user/user/send-mail")
         //      .send(data)
         //      .end((err,res)=>{
         //                     res.should.have.status(200);
         //                          res.should.be.a("object");
         //                          res.body.should.have.property("status_code")
         //                          res.body.should.have.property("message").eq(" userEmail are empty");
         //                         done()
         //                      })
         //   })
         // it("check user email are empty message  ",(done)=>{ 
         //    const data={
         //       password:"Nc@25753",
         //       confirm_Password:"Nc@25753"
         //    }
         //    chai.request(server)
         //      .post("/user/user/user/reset-password/64670722b98bdcab21303848/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDY3MDcyMmI5OGJkY2FiMjEzMDM4NDgiLCJpYXQiOjE2ODU1MzE5NTgsImV4cCI6MTY4NTc5MTE1OH0.LxPVh-0LEpVVdz0lwa2BVcsXRZaNJZjWdFupbmCtkOM")
         //      .send(data)
         //      .end((err,res)=>{
         //                     res.should.have.status(200);
         //                          res.should.be.a("object");
         //                          res.body.should.have.property("status_code")
         //                          res.body.should.have.property("message").eq("Password Updated Successfully");
         //                         done()
         //                      })
         //   })
         it("check user edit profile success message  ",(done)=>{ 
            const data={
               
            }
            chai.request(server)
              .post("/user/user/user/reset-password/64670722b98bdcab21303848/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDY3MDcyMmI5OGJkY2FiMjEzMDM4NDgiLCJpYXQiOjE2ODU1MzE5NTgsImV4cCI6MTY4NTc5MTE1OH0.LxPVh-0LEpVVdz0lwa2BVcsXRZaNJZjWdFupbmCtkOM")
              .send(data)
              .end((err,res)=>{
                             res.should.have.status(200);
                                  res.should.be.a("object");
                                  res.body.should.have.property("status_code")
                                  res.body.should.have.property("message").eq("Password Updated Successfully");
                                 done()
                              })
           })
  })
});
