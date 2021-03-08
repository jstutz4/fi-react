import React, { useState } from 'react'
import Selector from '../components/admin_selector'
import AddElementsContainer from '../components/addElementsContainer'
import VideoFileElement from '../components/videoFileElement'
import Paragraph from '../components/admin_paragraph'
import addArticle from './admin_addArticle'


import gql from "graphql-tag";
import { useQuery, useMutation } from '@apollo/react-hooks';
import {Dropbox} from "dropbox";

export default function Admin(props) {

    const getFiles = gql`
        query files {
            files{
            id,
            source,
            displayname
            }
        }
    `

    let { data : fileData, loading:loadingFile, error:fileError}  = useQuery(getFiles)

    const addVideo = gql`
    mutation addVideo($file: Upload!) {
        videoUpload(file: $file)
      }
      `

    //  const [callAddVideo] = useMutation(addVideo, {operations: "videoUpload"})

    function uploadFile(e){
       let file = e.target.files[0]
       let url =  URL.createObjectURL(file)

       // don't know how to set up so I can send a file to sever
       //callAddVideo({variables: {file}})


       // code work on client cant get file to send to sever then to upload
       // this way is not secure 
       
       /*
        const ACCESS_TOKEN = `sl.AsbZtwWUMObnnxU53gmQ51G0zOWi6m2cvGNAKvv7X2f3phR1G1VPdg6tMNpPKMpJF2A8eXr2o2OM98M-pS_mJSraCzanLbmB0PWqQrY_Wx17Aznl-9gSIZ769fhghOlYlrRW5Pa-`    
        const UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024;
        var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
        
        if (file.size < UPLOAD_FILE_SIZE_LIMIT) { // File is smaller than 150 Mb - use filesUpload API
        dbx.filesUpload({path: '/' + file.name, contents: file})
            .then(function(response) {
                // then do another api call to get the shareable link
                // then do a graphql mutation and add the link to the db
            console.log(response);
            })
            .catch(function(error) {
            console.error(error);
            });
        }
        */

    }

    return(
        <React.Fragment>

            <label htmlFor="videoSrc">Video URL
                <input type="url" placeholder="https://www.youtube.com/your-video" pattern="https://.*"></input>
            </label>
            
            {AddElementsContainer({elementConstructor: VideoFileElement, elementProps: {data: fileData}, buttonGroup: [{value: "Add Another File"}] })}
            
            {/* {VideoFileElement({data: fileData})} */}

            <div>
                <button onClick={()=> console.log("add video function")}>Add Video</button>
            </div>
        </React.Fragment>
    )
}