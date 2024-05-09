// Everything below here is placeholder. Delete this line when you begin the first edit.

import { useCallback, useEffect, useMemo, useState } from 'react'
import RTIconSource from '../assets/RTIconSource'
import UICard from '../ui/UICard'
import UICardGroup from '../ui/UICardGroup'
import UIFlexbox from '../ui/UIFlexbox'
import UIText from '../ui/UIText'
import UIKeyboardInput from '../ui/UIKeyboardInput'
import UIImage from '../ui/UIImage'
import axios from 'axios'
import { useToast } from '../ui/UIToast'

function MainPage() {
  const [message, setMessage] = useState<string>("")
  // const [voice2TextMessage, setVoice2TextMessage] = useState<string>("")
  const [llmResponse, setLlmResponse] = useState<string>("")
  const socket = useMemo(() => {
    const sc = new WebSocket('ws://localhost:3000')
    sc.addEventListener("open", function(event) {
      sc.send(JSON.stringify({identity: "lmcc_conn"}))
      console.log("LMCC connected to backend!")
    })
    sc.addEventListener("message", function(event) {
      try {
        const user_input = JSON.parse(event.data);
        const inputMessage = user_input['user_input']
        console.log("Hololens User Input: " + user_input)
        setMessage(inputMessage)
      } catch (e: any) {
        console.log(e.message)
      }
    })
    return sc
  }, [])
  const toast = useToast()
  // const onSubmitVoice2Text = useCallback((value) => {
  //   if (!value) return
  //   console.log(`Submitted: ${value}`);
  //   sendUserInputToLLM(value, async (state, message, data, error)=> {
  //     if(state) {
  //         console.log(data);
  //         const commandObject = data["llm_response"];
  //         socket.send(JSON.stringify(commandObject));
  //     }
  //   }); 
  //   setVoice2TextMessage('')
  // }, []);
  const onSubmitLLM = useCallback((value) => {
    if (!value) return
    console.log(`Submitted: ${value}`);
    sendUserInputToLLM({user_input: "user_input"}, async (state, message, data, error)=> {
      if(state) {
          console.log(data);
          const commandObject = data["llm_response"];
          setLlmResponse(JSON.stringify(commandObject))
      }
    });
    setMessage('')
  }, []);

  const onRespondHMD = useCallback((value) => {
    if (!value) return
    try {
      const commandObject = JSON.parse(llmResponse)
      socket.send(JSON.stringify({"llm_response": commandObject}));
      setLlmResponse("")
    } catch (e: any) {
      console.error(e.message)
      toast("Please make sure that the response has correct format!", "error", 4000)
    }
  }, [llmResponse])
  // const onSubmitVoice2Text = useCallback((value) => {
  //   if (!value) return
  //   console.log(`Submitted: ${value}`);
  //   sendUserInputToLLM(value, async (state, message, data, error)=> {
  //     if(state) {
  //         console.log(data);
  //         const commandObject = data["llm_response"];
  //         // socket.send(JSON.stringify(commandObject));
  //         setMessage(JSON.stringify(commandObject));
  //         console.log("done set msg")
  //     }
  //   }); 
  //   setVoice2TextMessage('')
  // }, []);
  // const onSubmitLLM = useCallback((value) => {
  //   if (!value) return
  //   console.log(`Submitted: ${value}`);
  //   socket.send(message);
  //   console.log("done send msg")
  //   // sendUserInputToLLM(value, async (state, message, data, error)=> {
  //   //   if(state) {
  //   //       console.log(data);
  //   //       const commandObject = data["llm_response"];
  //   //       socket.send(JSON.stringify(commandObject));
  //   //   }
  //   // });
  //   setMessage('')
  // }, []);
  useEffect(() => {
    const videoElement = document.getElementById("hololens-stream") as HTMLVideoElement | null
    if (!videoElement) return
    const aspectRatio = videoElement.videoWidth / videoElement.videoHeight
    if (aspectRatio > 1) {
      videoElement.height = 1000
      videoElement.width = 1000 * aspectRatio
    } else {
      videoElement.width = 1000
      videoElement.height = 1000 / aspectRatio
    }
  })
  useEffect(() => {
    const interval = setInterval(() => {
      const videoElement = document.getElementById("hololens-stream") as HTMLVideoElement | null
    if (!videoElement) {
      return
    }
    // videoElement.load();
    // videoElement.play();
    }, 800);
    return () => clearInterval(interval)
  }, [])

  const test = "https://img-getpocket.cdn.mozilla.net/296x148/filters:format(jpeg):quality(60):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2Fade816b9-d8f8-4666-96a5-ebc521a5d9a8.jpeg";
  return (
    <UIFlexbox className='main-page' direction='column'>
      <UIText variant='h1' textAlign='center'>NASA-SUITS LMCC Panel</UIText>
      <UIText variant='h3' textAlign='center'>Space Bear</UIText>
      <UIFlexbox className='main-page-wrapper' direction='column'>
        <UICardGroup className='wrapper'>
          <UICard className="hmd-display">
            <div>
              <UIText>HMD Display</UIText>
            </div>
            <video autoPlay id='hololens-stream'>
              <source src="https://172.20.10.3/api/holographic/stream/live.mp4" type="video/mp4"></source>
            </video>
            <UIImage src={test} fillWithCropFocus="center" />
          </UICard>
          <UICardGroup className='wrapper-right' direction='column'>
            <UICard className='rover-camera'>
              <div>
                <UIText>Rover Camera</UIText>
              </div>
              <UIImage src={test} fillWithCropFocus="center" />
            </UICard>
            {/* <UICard className='hmd-camera'>
              <div>
                <UIText>HMD Camera</UIText>
              </div>
              <UIImage src={test} fillWithCropFocus="center" />
            </UICard> */}
          </UICardGroup>
        </UICardGroup>
        {/* <UIFlexbox className='voice2text-input' direction='column'>
          <UIKeyboardInput 
            name='voice2text-input'
            value={voice2TextMessage}
            onChange={(name, value) => setVoice2TextMessage(value)}
            placeholder="Please Inspect Your DE Partner's Input Here and Send it to LLM [Press Enter to Send]"
            onSubmit={(value) => onSubmitVoice2Text(value)}/>
        </UIFlexbox> */}
        <UIFlexbox className='llm-input' direction='column'>
          <UIKeyboardInput 
            name='llm-input'
            value={message}
            onChange={(name, value) => setMessage(value)}
            placeholder="Please Inspect The Input From DE And Correct Any Inaccurate Commands [Press Enter to Send]"
            onSubmit={(value) => onSubmitLLM(value)}/>
          <UIKeyboardInput
            name="llm-response"
            value={llmResponse}
            onChange={(name, value) => setLlmResponse(value)}
            placeholder="Please Inspect The LLM Response And Correct Any Errors [Press Enter to Send]"
            onSubmit={(value) => onRespondHMD(value)}
            />
        </UIFlexbox>
      </UIFlexbox>
    </UIFlexbox>
  )
}

function sendUserInputToLLM(inputMessage, callback){
  const axiosParams = {
      data: JSON.stringify(inputMessage),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      method: 'post',
      url: "http://localhost:8000",
    }
  
  axios
  .request(axiosParams)
  .then(response => {
      // console.debug(response, 'response')
      // console.debug(response, 'Axios response')
      setTimeout(() => {
    callback(true, null, response.data, null)
      }, 0)
  })
  .catch((error) => {
      if (error.response) {
      // Request made and server responded
      console.error(error.response, 'Axios response error')
      console.error(error.response.data)
      console.error(error.response.status)
      console.error(error.response.headers)
      } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request, 'Axios request error')
      } else {
      // Something happened in setting up the request that triggered an Error
      console.error(error.message, 'Axios generic error')
      }
  })
}

export default MainPage