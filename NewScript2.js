
	function phonenumber(inputtxt)
	{
	  var phoneno = /^\d{10}$/;
	  if(inputtxt.match(phoneno)){return true;}
	  else 
	  {  
	  alert("Please Enter a valid mobile NO !!!!!");
	  document.getElementById('mob').value="";
	  return false;
	  }
	}

	function validate_fields()
	{
		if(fnm===""||lnm===""||em_id===""||state===""||city===""||address===""||Person_to_meet===""||Reason_M===""||fev===""||cough===""||breath_diff===""||resp_dis===""||meet_time===""||meet_date===""||area_code==="")
		{
			alert("Please Enter All details !!!");
			return false;
		}
		else{
			
			return true;
		}
	}

	
		
	
	
	var fnm,lnm,mob_no,em_id,state,city,address,Person_to_meet,Reason_M,fev,cough,breath_diff,resp_dis,meet_date,meet_time,area_code,visit_status,Faculty_Name,notify_status;
	function getData()
	{
	
		fnm=document.getElementById('first_nm').value;
		lnm=document.getElementById('last_nm').value;
		mob_no=document.getElementById('mob').value;
		area_code=document.getElementById('area_co').value;
		em_id=document.getElementById('email').value;
		state=document.getElementById('state_nm').value;
		city=document.getElementById('city_nm').value;
		address=document.getElementById('address').value;
		Person_to_meet=document.getElementById('person_list').value;
		Faculty_Name=document.getElementById('person_list').options[document.getElementById('person_list').selectedIndex].text;
		Reason_M=document.getElementById('purposeMeet').value;
		meet_date=document.getElementById('txt_dt').value;
		meet_time=document.getElementById('txt_tm').value;
		visit_status=false;
		notify_status=false;
		
		
		
		var ele=document.getElementsByName('fever');
		for(i=0;i<ele.length;i++)
		{
			if(ele[i].checked)
			{
				fev=ele[i].value;
			}
		}
		
		var ele2=document.getElementsByName('cough');
		for(i=0;i<ele2.length;i++)
		{
			if(ele2[i].checked)
			{
				cough=ele2[i].value;
			}
		}
		
		
		var ele3=document.getElementsByName('radio3');
		for(i=0;i<ele3.length;i++)
		{
			if(ele3[i].checked)
			{
				breath_diff=ele3[i].value;
			}
		}
		
		var ele4=document.getElementsByName('radio4');
		for(i=0;i<ele4.length;i++)
		{
			if(ele4[i].checked)
			{
				resp_dis=ele4[i].value;
			}
		}
		
		
		
	}

  // Your web app's Firebase configuration
  
  
  function uploadData()
  {
			getData();
			if(validate_fields()&&phonenumber(mob_no))
			{
					firebase.database().ref('Visitors/'+mob_no).set(
							{
							Mobile_NO:mob_no,
							AreaCode:area_code,
							First_Name:fnm,
							Last_Name:lnm,
							Email_ID:em_id,
							Address:address,
							City:city,
							State:state,
							WhomToMeet_Name:Faculty_Name,
							WhomToMeet:Person_to_meet,
							Reason:Reason_M,
							MDate:meet_date,
							MTime:meet_time,
							FeverStatus:fev,
							Cough:cough,
							Breathing_Difficulty:breath_diff,
							Resp_Problem:resp_dis,
							Visited_Status:visit_status,
							Notification_Status:notify_status
							});
							
					firebase.database().ref('DateDB/'+meet_date+'/'+mob_no+'/').set({
							Mobile_NO:mob_no,
							AreaCode:area_code,
							First_Name:fnm,
							Last_Name:lnm,
							Email_ID:em_id,
							Address:address,
							City:city,
							State:state,
							WhomToMeet_Name:Faculty_Name,
							WhomToMeet:Person_to_meet,
							Reason:Reason_M,
							MDate:meet_date,
							MTime:meet_time,
							FeverStatus:fev,
							Cough:cough,
							Breathing_Difficulty:breath_diff,
							Resp_Problem:resp_dis,
							Visited_Status:visit_status,
							Notification_Status:notify_status
	
							});
		
				
				alert('Form Submitted Successfully!!!');
		  }
  }

  function check_doc()
  {
	  
					
					mob_no=document.getElementById('mob').value;
					if(phonenumber(mob_no))
					{
						firebase.database().ref('Visitors/'+mob_no).on('value',function(snapshot){
						var ret_value=snapshot.val();
						if(ret_value==null)
						{
						return;
						}
						else
						{
						
						document.getElementById('mob').value=snapshot.val().Mobile_NO;
						document.getElementById('area_co').value=snapshot.val().AreaCode
						document.getElementById('email').value=snapshot.val().Email_ID;
						document.getElementById('address').value=snapshot.val().Address;
						document.getElementById('city_nm').value=snapshot.val().City;
						document.getElementById('state_nm').value=snapshot.val().State;
						document.getElementById('last_nm').value=snapshot.val().Last_Name;
						document.getElementById('first_nm').value=snapshot.val().First_Name;
						
						}
						});
					}
					
					
				
  }

			const nameList=[];
			const desList=[];
			const keyList=[];
			function getDataForList()
			{
				
				qry=firebase.database().ref('Users').orderByKey();
				qry.once("value")
				  .then(function(snapshot) {
					snapshot.forEach(function(sn) {
					key = sn.key;
					var nm=sn.val().name;
					var des=sn.val().designation;
					nameList.push(nm);
					desList.push(des);
					keyList.push(key);
					
				  });
				});
				

			}
			
			function rem_opt()
			{
				var select=document.getElementById('person_list');
				for(var i=select.length-1;i>=0;i--)
				{
					select.remove(i);
				}
			}
			
			
			
			function create_list()
			{
				
				rem_opt();
				for(var i=0;i<nameList.length;i++)
				{
					var select=document.getElementById('person_list');
					ele=nameList[i]+"    "+desList[i];
					var com = document.createElement("option");
					var k=keyList[i];
					com.textContent = ele;
					com.value = k;
					select.appendChild(com);
					
				}
			}			
			
var firebaseConfig = {
  apiKey: "AIzaSyDBRP6JnKWOMiAiCtWvj3KQJornuKATjQo",
  authDomain: "githubvisitorform.firebaseapp.com",
  databaseURL: "https://githubvisitorform-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "githubvisitorform",
  storageBucket: "githubvisitorform.appspot.com",
  messagingSenderId: "215875805557",
  appId: "1:215875805557:web:595cc4aa9d89003eadf33c"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
	
		
