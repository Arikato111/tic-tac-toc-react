import "./App.css";
import styled from "@emotion/styled";
import { useState } from "react";

const Cell = styled.div`
    width: 100%;
    height: 70px;
    background-color: white;
    border: 1px solid gray;
    box-shadow: 1px 1px 3px black;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    cursor: pointer;
    &:hover {
        background-color: gray;
    }
`;

const BoardContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 240px;

    // background-color: white;
    grid-row-gap: 16px;
    grid-column-gap: 16px;
    margin: auto;
`;

const GameButton = styled.button`
    width: 240px;
    margin: auto;
    height: 32px;
    margin-top: 16px;
    border-radius: 7px;
    border: none;
    box-shadow: 1px 1px 3px black;

    &:hover {
        background-color: #6e6e6e;
    }
`;

const winState = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
];

const calculateWinner = (gameState) => {
    let winner;
    for (let i = 0; i < winState.length; i++) {
        const winStateS = winState[i];
        if (
            gameState[winStateS[0]] === gameState[winStateS[1]] &&
            gameState[winStateS[1]] === gameState[winStateS[2]] &&
            Boolean(gameState[winStateS[0]])
        ) {
            winner = gameState[winStateS[0]];
        }
    }
    return winner;
};

function App() {
    const [gameState, setGameState] = useState([
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
    ]);

    const restartGame = () => {
        setGameState(["", "", "", "", "", "", "", "", ""]);
        setPlayer("X");
    };

    const [player, setPlayer] = useState("X");
    const winner = calculateWinner(gameState);
    const isTie =
        !winner && gameState.filter((state) => Boolean(state)).length === 9;

    const onCellClick = (index) => {
        if (gameState[index] !== "" || Boolean(winner) || isTie) {
            return;
        }
        const newGameState = [...gameState];
        newGameState[index] = player;
        setGameState(newGameState);
        if (player === "X") {
            setPlayer("O");
        } else {
            setPlayer("X");
        }
    };

    return (
        <div
            className="App"
            style={{ backgroundColor: "white", height: "95vh" }}
        >
            <h1>Tic Tac Tae</h1>
            {winner ? (
                <h2>Congrat {winner} is win</h2>
            ) : isTie ? (
                <h2>Game is Tie</h2>
            ) : (
                <h2>Player {player}, It's your turn</h2>
            )}

            <BoardContainer>
                {gameState.map((cellNumber, index) => {
                    return (
                        <Cell onClick={() => onCellClick(index)}>
                            {cellNumber}
                        </Cell>
                    );
                })}
            </BoardContainer>
            <GameButton onClick={restartGame}>Restart</GameButton>
            <footer>
                <div>
                    <a target={"_blank"} href="https://github.com/Hakata111/tic-tac-toc-react">
                        <img
                            style={{
                                width: "50px",
                                position: "fixed",
                                bottom: "0",
                                right: "0",
                                margin: "10px",
                            }}
                            src="/github.png"
                            alt="github icon"
                        />
                    </a>
                </div>
            </footer>
        </div>
    );
}

export default App;
