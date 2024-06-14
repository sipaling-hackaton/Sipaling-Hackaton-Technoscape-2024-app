const convertSentimentToColor = (sentiment: string) => {
  const res = sentiment?.toLowerCase();
  console.log(sentiment)
  if (res === "positive") {
    return "rgba(0, 255, 0, 1)"
  }
  if (res === "neutral") {
    return "rgba(0, 0, 255, 1)"
  }
  if (res === "negative") {
    return "rgb(184,0,0)"
  }
  return "rgb(184,0,0)"
}

export {
  convertSentimentToColor
}