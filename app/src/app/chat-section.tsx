"use client";

// import {ReactNode, useState} from "react";
import {Button} from "@/components/ui/button";
import {useFormState} from 'react-dom'
import {testGemini} from "@/services/gemini";
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
  const [state, formAction] = useFormState(testGemini, initialFormState)
  useEffect(() => {
    console.log(state)
  }, [state])

  return (
      <form
          className="flex flex-col gap-4"
          action={formAction}
      >
        <p
            className="bg-gray-100 p-2 rounded-md text-sm text-gray-800"
            aria-live="polite">
          response: {state?.response?.response?.candidates[0]?.content.parts[0]?.text}
        </p>
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