import axios from 'axios'; 
  
import React,{Component} from 'react'; 
 
import { Link, Redirect } from 'react-router-dom';
import 'C:/BEProject/covid-analysis/src/styles/upload.css';
class Dashboard extends Component { 
   
    state = { 
  
      // Initially, no file is selected 
      selectedFile: null,
      detectedclass:'',
      perc:''
    }; 
     
    // On file select (from the pop up) 
    onFileChange = event => { 
     
      // Update the state 
      this.setState({ selectedFile: event.target.files[0] }); 
     
    }; 
     
    // On file upload (click the upload button) 
    onFileUpload = () => { 
     
      // Create an object of formData 
      const formData = new FormData(); 
      // Update the formData object 
      formData.append( 
        "file1", 
        this.state.selectedFile, 
        this.state.selectedFile.name 
      ); 
        
      // Details of the uploaded file 
      console.log(this.state.selectedFile); 
     
      // Request made to the backend api 
      // Send formData object 
      // axios.post("http://192.168.43.28:5000/detect", formData).then((response)=>{
      axios.post("http://127.0.0.1:5000/detect", formData).then((response)=>{
        console.log(response);
        this.setState({detectedclass:response.data.class, perc:response.data.perc});
      }); 
    }; 

     
    // File content to be displayed after 
    // file upload is complete 
    fileData = () => {  
      if (this.state.selectedFile) { 
          
        return ( 
          <div> 
            <h2>File Details:</h2> 
            <p>File Name: {this.state.selectedFile.name}</p> 
            <p>File Type: {this.state.selectedFile.type}</p> 

            Detected Class : <p ><h1 style={{ color: 'red' } }>{this.state.detectedclass}</h1></p>

          </div> 
        ); 
      } 
    }; 
     
    render() { 
     
      return ( 
        <div align="center">
				<div class="col-4 my-auto">
    
					<div class="file-upload">			
						<div class="image-upload-wrap">
							<input class="file-upload-input" type='file' name='file'
								onChange={this.onFileChange} accept="image/*" />
							<div class="drag-text">
								<h3>Click to Add Image</h3>
							</div>
						</div>
          </div>
          
          <div align="center">
            <h1> 
              Covid Analysis 
            </h1> 
          {this.state.selectedFile?
            <div className="text-center">  
                <button className="mt-4" onClick={this.onFileUpload}> 
                  Upload! 
                </button> 
            </div> 
            :
            ''}
          {this.fileData()} 						
					</div>
          
				</div>
        <div className="text-center">
                  <Link to="/auth/login">Sign Out</Link>
          </div>
        </div>
      ); 
    } 
  } 
  
  export default Dashboard; 