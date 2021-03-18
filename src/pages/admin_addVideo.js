import React, { useState } from 'react'
import Selector from '../components/admin_selector'
import AddElementsContainer from '../components/addElementsContainer'
import VideoFileElement from '../components/videoFileElement'
import Paragraph from '../components/admin_paragraph'
import addArticle from './admin_addArticle'


import gql from "graphql-tag";
import { useQuery, useMutation } from '@apollo/react-hooks';
import {Dropbox} from "dropbox";

export default function AdminVideo(props) {

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
    mutation addVideo($file: VideoInput!) {
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

    function sendVideo(e){
        let files = []
        const title = document.getElementById("videoTitle").value
        const source = document.getElementById("videoSrc").value
        let displaynames = document.getElementsByName("fileName")
        let fileURLs = document.getElementsByName("fileURL")
        const articleId = document.getElementsByName("articles")[0].value
        console.log(title)
        console.log(source)
        console.log(displaynames)
        console.log(fileURLs)
        var videoInDB = document.getElementsByName("db")[0].checked

        Array.from(fileURLs).forEach((file, index) => {
            console.log("stopping here")
            console.log(file)
            const fileSource = document.querySelector(`#fileURLs option[value="${file.value}"]`)

            // if file is already in the data base
            if(fileSource){
                files[index] = {source: fileSource.getAttribute("data-id"), displayname: displaynames[index].value, db: true}
            }
            // if the file is not in the data base
            else
            {
                if(file.value != "")
                {
                    files[index] = {source: file.value, displayname: displaynames[index].value, db:false}
                }
            }
        
        })
        
        const videoWhole = {title, source, articleId, videoInDB, files}
        console.log(videoWhole)

        callUploadVideo({variables: {videoWhole}})

        //temp1[0].list.attributes[0].ownerElement.childNodes[0].dataset
        // document.querySelector('option[value="custom url"]').getAttribute("data-id")
        
    }

    function checkForm(e){
        const form = document.getElementById('videoForm');
        document.getElementById("sendVideo").disabled = !form.checkValidity()
    }
    
    const uploadVideo = gql`
    mutation addArticleVideo($videoWhole: VideoInput)
    {
        videoUpload(
            video: $videoWhole
        )
    }
    `
    const [callUploadVideo] = useMutation(uploadVideo)

    return(
        <React.Fragment>
            <label> Is the video already in the data base?
                <input type="checkbox" name="db" defaultChecked ></input>
            </label>
            <label htmlFor="videoTitle">Video Title
                <input id="videoTitle" type="text" minLength="3" maxLength="20" placeholder="Awesome Video Title" required></input>
            </label>

            <label htmlFor="videoSrc">Video URL
                <input id="videoSrc" type="url" placeholder="https://www.youtube.com/your-video" pattern="https://.*" required></input>
            </label>
            
            {AddElementsContainer({elementConstructor: VideoFileElement, elementProps: {data: fileData}, buttonGroup: [{value: "Add Another File"}] })}
            
            {/* {VideoFileElement({data: fileData})} */}

            <div>
                <button id="sendVideo" onClick={sendVideo}>Add Video</button>
            </div>
         </React.Fragment>
    )
}