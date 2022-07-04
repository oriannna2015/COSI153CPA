import Axios from 'axios';
import qs from 'qs'

const url="https://fathomless-shelf-49222.herokuapp.com";

const sendFeedback = async (feedback) => {
    const response = 
      await Axios.post(url+"/cloud/store",
                          {email:'tjhickey@brandeis.edu',
                           key:'feedbackDemo',
                           value:feedback,
                          });
    console.dir(response.data);
};

const getUser = (saveUser,user) => {
    console.log('getting user')
    const userData = qs.stringify({username: user})
    const URL = url+ "/cloud/login"
    const response = Axios( {
      method: 'post',
      url: URL,
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded', 
      },
      data : userData
    })
    saveUser(response.data);
    console.dir(response.data);
  }; 

const clearData = async(email) => {
  console.log('clear');
  const response = await Axios.post(url+"/cloud/clear",{email:'tjhickey@brandeis.edu'});
};

export {sendFeedback,getUser,clearData};