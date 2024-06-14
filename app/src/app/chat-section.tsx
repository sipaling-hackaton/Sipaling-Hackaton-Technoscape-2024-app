"use client";

import {Button} from "@/components/ui/button";
import {useFormState} from 'react-dom'
import {chatGemini} from "@/services/gemini";
import {useEffect, useState} from "react";
import {Textarea} from "@/components/ui/textarea"
import {Input} from "@/components/ui/input";

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


// parser to json from string
const parseResponse = (response: string) => {
  try {
    // clean the response
    response = response.replace(/```json/g, "")
    response = response.replace(/```/g, "")
    console.log(response)
    return JSON.parse(response)
  } catch (e) {
    return response
  }
}

const Chat = () => {
  const [text, setText] = useState<string>("")
  // @ts-ignore
  const [state, formAction] = useFormState(chatGemini, initialFormState)

  const [chatHistory, setChatHistory] = useState<Chat[]>([])

  useEffect(() => {
    // @ts-ignore
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
          chatHistory.map((chat: Chat) => {
            const content = chat.response.response.candidates[0].content?.parts[0].text
            if (!content)
            {
              return
            }
            const parsedContent = parseResponse(content)
            return (
                (
                    <div
                        className={"flex flex-col gap-4 bg-gray-100 p-4 rounded-md max-w-md"}
                        key={chat.message}
                    >

                      <ul
                      className={"flex flex-col gap-4 list-disc"}

                      >
                      {
                        parsedContent.questions.map((question: any) => {
                          return (
                              <li
                                  key={question.index}
                                  className={"flex flex-col gap-4 bg-gray-200 p-4 rounded-md max-w-md"}
                              >
                                <p>
                                  {question.question}
                                </p>
                                <p>
                                  {question.summary}
                                </p>
                              </li>
                          )
                        }
                        )
                      }
                      </ul>

                      <p
                      style={{
                        backgroundColor: parsedContent.sentiment === "NEGATIVE" ? "red" : parsedContent.sentiment === "POSITIVE" ? "green" : "gray"
                      }}
                      >
                        {parsedContent.sentiment}
                      </p>
                      <p>
                        {parsedContent.advice}
                      </p>
                    </div>
                )
            )
          })
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

        <section
        className={"flex gap-4"}
        >
          <Input
          name={"language"}
          placeholder={"Language"}
          required
          defaultValue={"indonesia"}
          />

          <Input
              name={"style"}
              placeholder={"Style"}
              required
              defaultValue={"formal"}
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