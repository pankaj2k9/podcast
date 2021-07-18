import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import mp3 from "../../audio/s93290-US-774s-1620656598.mp3";
import Grid from "@material-ui/core/Grid";
import {transcripts } from "../../transcripts/transcript";

interface Transcript {
  confidence: number;
  endTime: number;
  speaker: number;
  startTime: number;
  word: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "50px",
  },
  para : {
    display: 'inline',
    fontSize: '20px',
    cursor: 'pointer'
  },
  yellowPara: {
    display: 'inline',
    fontSize: '20px',
    color: 'yellow',
    cursor: 'pointer'
  },
}));

const index: React.FC = () => {
  const classes = useStyles();
  const [transcript, setTranscript] = useState<Transcript[] | null>(null);
  const [progress, setProgress] = useState<any>({ backward: 5000, forward: 5000 });
  const [curTime, setCurTime] = useState<number>(0);

  useEffect(() => {
    setTranscript(JSON.parse(transcripts))

  }, []);

  const onListenHandler = (e:any) => {
    setCurTime(e.target.currentTime);
  }
  const setProgressHandler = (time: number) => {
    const element:any = document.querySelector("audio");
    element.currentTime = time;
  }
   return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      className={classes.root}
      spacing={2}
    >
      <Grid item xs={6}>
        <AudioPlayer 
        autoPlay src={mp3} 
        progressJumpSteps={progress} 
        listenInterval={10} 
        onListen={onListenHandler} 
        onPlay={(e) => console.log("onPlay")} 
        />
      </Grid>
      <Grid item xs={10}>
        {transcript &&
          transcript.map((singleTranscript) => (
            <p className={(singleTranscript.startTime - .15 < curTime && curTime < singleTranscript.startTime + .15)  ? classes.yellowPara : classes.para} onClick={() => setProgressHandler(singleTranscript.startTime)}>{singleTranscript.word} </p>
          ))}
      </Grid>
    </Grid>
  );
};

export default index;
