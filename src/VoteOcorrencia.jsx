import axios from "axios";
import { useEffect, useState } from "react";
import { notifyError } from "./util/Util";

/* const getAvaliacao = (id) => {
  let url = `http://localhost:8082/api/ocorrencia/${id}`;
  axios.get(url).then(({ data }) => {
    return data.avaliacao;
  }).catch(
    err => {
        notifyError("Erro durante a avaliação da ocorrência");
        return null;
    }
  );
}; */

const VoteOcorrencia = ({ userId, ocorrId, avaliacao }) => {
  /* const [contador, setContador] = useState(avaliacao);
  const [vote, setVote] = useState("");
  const STATE = { UPVOTE: "UP", DOWNVOTE: "DOWN" }; */

  //(async() => console.log( await getAvaliacao(ocorrId)))();
  /* useEffect(
    () => setContador(getAvaliacao(ocorrId))
  , [contador]) */

  /* const updateAvaliacao = (id) => {
    let url = `http://localhost:8082/api/ocorrencia/${id}`;
    axios
      .get(url)
      .then(({ data }) => {
        setContador(data.avaliacao);
      })
      .catch((err) => {
        notifyError("Erro durante a avaliação da ocorrência");
        //return null;
      });
  };

  const handleUpvote = (e) => {
    e.stopPropagation();
    let url = "";
    switch (vote) {
      case "":
        url = `http://localhost:8082/api/ocorrencia/${ocorrId}/upvote`;
        axios.put(url).then((res) => {
          updateAvaliacao(ocorrId);
          setVote(STATE.UPVOTE);
        });
        break;
      case STATE.UPVOTE:
        url = `http://localhost:8082/api/ocorrencia/${ocorrId}/downvote`;
        axios.put(url).then((res) => {
          updateAvaliacao(ocorrId);
          setVote("");
        });
        break;
      case STATE.DOWNVOTE:
        url = `http://localhost:8082/api/ocorrencia/${ocorrId}/upvote`;
        axios.put(url).then((res) => {
          axios.put(url).then((res) => {
            updateAvaliacao(ocorrId);
            setVote(STATE.UPVOTE);
          });
        });
        break;
    }
  };
  const handleDownvote = (e) => {
    e.stopPropagation();
    let url = "";
    switch (vote) {
      case "":
        url = `http://localhost:8082/api/ocorrencia/${ocorrId}/downvote`;
        axios.put(url).then((res) => {
          updateAvaliacao(ocorrId);
          setVote(STATE.DOWNVOTE);
        });
        break;
      case STATE.DOWNVOTE:
        url = `http://localhost:8082/api/ocorrencia/${ocorrId}/upvote`;
        axios.put(url).then((res) => {
          updateAvaliacao(ocorrId);
          setVote("");
        });
        break;
      case STATE.UPVOTE:
        url = `http://localhost:8082/api/ocorrencia/${ocorrId}/upvote`;
        axios.put(url).then((res) => {
          axios.put(url).then((res) => {
            updateAvaliacao(ocorrId);
            setVote(STATE.DOWNVOTE);
          });
        });
        break;
    }
  }; */
  // No backend
  const [contador, setContador] = useState(0);
  const [vote, setVote] = useState("");
  const VOTESTATE = { UPVOTE: "UP", DOWNVOTE: "DOWN" };

  const handleUpvote = (e) => {
    e.stopPropagation();
    switch (vote) {
      case "":
        setContador((prev) => prev + 1);
        setVote(VOTESTATE.UPVOTE);
        break;
      case VOTESTATE.UPVOTE:
        setContador((prev) => prev - 1);
        setVote("");
        break;
      case VOTESTATE.DOWNVOTE:
        setContador((prev) => prev + 2);
        setVote(VOTESTATE.UPVOTE);
        break;
    }
  };
  const handleDownvote = (e) => {
    e.stopPropagation();
    switch (vote) {
      case "":
        setContador((prev) => prev - 1);
        setVote(VOTESTATE.DOWNVOTE);
        break;
      case VOTESTATE.UPVOTE:
        setContador((prev) => prev - 2);
        setVote(VOTESTATE.DOWNVOTE);
        break;
      case VOTESTATE.DOWNVOTE:
        setContador((prev) => prev + 1);
        setVote("");
        break;
    }
  };
  return (
    <div className="voting self-end flex gap-3">
      <div className="counters self-center">
        <strong>{contador}</strong>
      </div>
      <div className="arrows flex flex-col gap-5">
        <button
          className={
            vote == VOTESTATE.UPVOTE
              ? "w-5 h-5 bg-upvote-hover-icon"
              : "w-5 h-5 bg-upvote-icon hover:bg-upvote-hover-icon"
          }
          onClick={handleUpvote}
        ></button>
        <button
          className={
            vote == VOTESTATE.DOWNVOTE
              ? "w-5 h-5 bg-downvote-hover-icon"
              : "w-5 h-5 bg-downvote-icon hover:bg-downvote-hover-icon"
          }
          onClick={handleDownvote}
        ></button>
      </div>
    </div>
  );
};

export default VoteOcorrencia;
