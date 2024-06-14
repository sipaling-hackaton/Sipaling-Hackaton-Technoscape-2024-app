"use client";

import {Button} from "@/components/ui/button";
import {useFormState} from 'react-dom'
import {chatGemini} from "@/services/gemini";
import {useEffect, useState} from "react";
import {Textarea} from "@/components/ui/textarea"

interface Chat {
  message: string
  response: Response
}

interface Response {
  response: {
    candidates: [
      {
        content: {
          parts: [
            {
              text: string
            }
          ]
        }
      }
    ]
  }

}


const initialFormState: Chat = {
  message: "",
  response: {
    response: {
      candidates: [
        {
          content: {
            parts: [
              {
                text: ""
              }
            ]
          }
        }
      ]
    }

  }
}


const Chat = () => {
  const [text, setText] = useState<string>("")
  const [state, formAction] = useFormState(chatGemini, initialFormState)

  const [chatHistory, setChatHistory] = useState<Chat[]>([])

  useEffect(() => {
    setChatHistory([...chatHistory, state])
    console.log(chatHistory)
  }, [state])

  return (
      <form
          className="flex flex-col gap-4"
          action={formAction}
      >

        {/*Mapping user history*/}
        {
          chatHistory.map((chat: Chat) => (
              <div
                  className={"flex flex-col gap-4 bg-gray-100 p-4 rounded-md max-w-md"}
                  key={chat.message}
              >
                <p>
                  {chat.message}
                </p>
                <p>
                  {chat.response.response.candidates[0].content?.parts[0].text}
                </p>
              </div>
          ))
        }

        <section>
          <label htmlFor="input">Message</label>
          <Textarea
              id="input"
              name="input"
              placeholder="Message"
              required
          />
        </section>

        <section>
          <Button
              type={"submit"}
          >
            Send
          </Button>
        </section>
      </form>
  )
}

export {
  Chat
}