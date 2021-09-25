import React from "react";
import "../App.css";
import { Form, TextArea, Button, Icon } from "semantic-ui-react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Translate() {
  const [inputText, setInputText] = useState('');
  const [detectLanguageKey, setdetectedLanguageKey] = useState('');
  const [selectedLanguageKey, setLanguageKey] = useState('')
  const [languagesList, setLanguagesList] = useState([])
  const [resultText, setResultText] = useState('');
  const getLanguageSource = () => {
    axios.post(`https://libretranslate.de/detect`, {
        q: inputText
    })
        .then((response) => {
            setdetectedLanguageKey(response.data[0].language)
        })
}

const translateText = () => {
  getLanguageSource();

  let data = {
      q : inputText,
      source: detectLanguageKey,
      target: selectedLanguageKey
  }
  axios.post(`https://libretranslate.de/translate`, data)
  .then((response) => {
      setResultText(response.data.translatedText)
  })
}

const languageKey = (selectedLanguage) => {
  setLanguageKey(selectedLanguage.target.value)
}

useEffect(() => {
    axios.get(`https://libretranslate.de/languages`)
        .then((response) => {
            setLanguagesList(response.data)
        })
    getLanguageSource()
}, [inputText])

  return (
    <div>
      <div className="app-header">
        <h2 className="header">Simple Text Translator</h2>
      </div>

      <div className="app-body">
        <div>
          <Form>
            <Form.Field
              control={TextArea}
              placeholder="Type Text to Translate.."
              onChange={(e) => setInputText(e.target.value)}
            />

            <select className="language-select" onChange={languageKey}>
              <option>Please Select Language..</option>
              {languagesList.map((language) => {
                  return (
                      <option value={language.code}>
                          {language.name}
                      </option>
                  )
              })}
            </select>

            <Form.Field
              control={TextArea}
              placeholder=" Your Result Translation.."
              value={resultText}
            />

            <Button 
              size="large"
              color="blue"
              onClick={translateText}
            >

              <Icon name="translate" />
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
