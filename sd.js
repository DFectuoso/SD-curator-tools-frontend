// JavaScript Document
//AJAX REQUESTS

	var __theFormPostData ='';
	var divpost ='';
	
	function BuildFormData(formtograb)
	{		
	var theForm = document.forms[formtograb];
    count = theForm.elements.length;
    var element;
    re = new RegExp("\\x2B", "g");
    	for (i = 0; i < count; i++) {
       		 element = theForm.elements[i];
       		  if (element.tagName.toLowerCase() == "input") {
       		     __theFormPostData += element.name + "=" + element.value.replace(re, "%2B") + "&";
       		  }
       		  else if (element.tagName.toLowerCase() == "select") {            
       		     selectCount = element.children.length;
       		     for (j = 0; j < selectCount; j++) {
       		         selectChild = element.children[j];
       	   		      if ((selectChild.tagName.toLowerCase() == "option") && (selectChild.selected == true)) {
       	   	 	         __theFormPostData += element.name + "=" + selectChild.value.replace(re, "%2B") + "&";                
    	            }                
    	        }            
    	     }
    	}
	}
		
		var xmlRequest = false;
		
		function LoadData(formtograb,posttopage,posttodiv,callbackoption)
		{			
			BuildFormData(formtograb);
			divpost = posttodiv;
			
			if(window.XMLHttpRequest) 
			{
			try 
				{
				xmlRequest = new XMLHttpRequest();
			    }
			catch(e) 
				{
				xmlRequest = false;
			    }
	
			} 
			else if(window.ActiveXObject) 
			{
		   	try 
				{
		    	xmlRequest = new ActiveXObject("Msxml2.XMLHTTP");
			  	} 
			catch(e) 
				{
		    	try 
					{
      				xmlRequest = new ActiveXObject("Microsoft.XMLHTTP");
			    	} 
				catch(e) 
					{
      				xmlRequest = false;
    				}
				}	
			}
			if(xmlRequest) 
			{
			if (callbackoption != 'quiet')
			{
			xmlRequest.onreadystatechange = OnClientCallbackComplete;
			}													
			xmlRequest.open("POST", posttopage, true);
            xmlRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlRequest.send(__theFormPostData);
			__theFormPostData = '';
			/* for POST
			xmlRequest.open("GET", "ajaxtest2.htm", true);
			xmlRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xmlRequest.send();			
			*/
			}
			else
			{
			alert('Your browswer does not support AJAX commands. Please try again with IE, Firefox or Safari.');
			}
		}
		
		function OnClientCallbackComplete()
		{		
			if(xmlRequest != null)
			{
				if(xmlRequest.readyState == 4)
				{
					if(xmlRequest.status == 200)
					{
						document.getElementById(divpost).innerHTML = xmlRequest.responseText;
					}
				}
			}
		}