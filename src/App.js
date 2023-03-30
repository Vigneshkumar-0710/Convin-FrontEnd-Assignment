import React, { useState } from "react";
import "./App.css";
function App() {
  const [buckets, setBuckets] = useState([
    { name: "Entertainment Videos", cards: [], selected: false },
    { name: "Education Videos", cards: [], selected: false },
  ]);

  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");
  const [selectedBucket, setSelectedBucket] = useState("");
  const [newBucketName, setNewBucketName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [playedVideos, setPlayedVideos] = useState([]);
  const [showBucket,setShowBucket]=useState(false);

  const addCard = (event) => {
    event.preventDefault();
    const newCard = { name: cardName, link: cardLink, selected: false };
    const updatedBuckets = [...buckets];
    const bucketIndex = updatedBuckets.findIndex(
      (bucket) => bucket.name === selectedBucket
    );
    updatedBuckets[bucketIndex].cards.push(newCard);
    setBuckets(updatedBuckets);
    setCardName("");
    setCardLink("");
  };

  const deleteCard = (cardToDelete) => {
    const updatedBuckets = [...buckets];
    const bucketIndex = updatedBuckets.findIndex(
      (bucket) => bucket.name === selectedBucket
    );
    const updatedCards = updatedBuckets[bucketIndex].cards.filter(
      (card) => card.name !== cardToDelete.name
    );
    updatedBuckets[bucketIndex].cards = updatedCards;
    setBuckets(updatedBuckets);
  };

  const deleteCards = () => {
    const updatedBuckets = [...buckets];
    const bucketIndex = updatedBuckets.findIndex(
      (bucket) => bucket.name === selectedBucket
    );
    const updatedCards = updatedBuckets[bucketIndex].cards.filter(
      (card) => card && !card.selected // add null check for card object
    );
    updatedBuckets[bucketIndex].cards = updatedCards;
    setBuckets(updatedBuckets);
  };
  const addBucket = (event) => {
    event.preventDefault();
    const newBucket = { name: newBucketName, cards: [] ,selected:false};
    const updatedBuckets = [...buckets, newBucket];
    setBuckets(updatedBuckets);
    setNewBucketName("");
  };

  const moveCard = (cardToMove, destinationBucket) => {
    const updatedBuckets = [...buckets];
    const sourceBucketIndex = updatedBuckets.findIndex(
      (bucket) => bucket.name === selectedBucket
    );
    const destinationBucketIndex = updatedBuckets.findIndex(
      (bucket) => bucket.name === destinationBucket
    );
    const updatedSourceCards = updatedBuckets[sourceBucketIndex].cards.filter(
      (card) => card.name !== cardToMove.name
    );
    const updatedDestinationCards = [
      ...updatedBuckets[destinationBucketIndex].cards,
      cardToMove,
    ];
    updatedBuckets[sourceBucketIndex].cards = updatedSourceCards;
    updatedBuckets[destinationBucketIndex].cards = updatedDestinationCards;
    setBuckets(updatedBuckets);
  };

  const toggleModal = (cardToPlay) => {
    setShowModal(!showModal);
    const newPlayedVideo = {
      name: cardToPlay.name,
      link: cardToPlay.link,
      time: new Date().toLocaleString(),
      selected: true,
    };
    setPlayedVideos([...playedVideos, newPlayedVideo]);
  };

  return (
    <div className="App">
   
 <div className="Main-Heading">Card Management</div>
 
      <div className="cards-tab">
      <div className="cards-tab-1">  
     
      <form onSubmit={addCard}>
        <div className="card">
        <h2 >Add a <span className="Add-card">Card</span></h2>
          <label className="card-name">
            <span className="Add-card">Card</span> Name:
            <input
             required='true'
              className="input-box"
              type="text"
              value={cardName}
              onChange={(event) => setCardName(event.target.value)}
              placeholder="Enter Card Name"
            />
          </label>
          <label className="card-name">
          <span className="Add-card">Card</span> Link:
            <input
             required='true'
              className="input-box"
              type="text"
              value={cardLink}
              onChange={(event) => setCardLink(event.target.value)}
              placeholder="Enter Link"
            />
          </label>

          <label className="card-name">
          <span className="Add-card">Bucket:</span>
            <select className="SAB"
             required='true'
              value={selectedBucket}
              onChange={(event) => setSelectedBucket(event.target.value)}
            >
              <option  value="">Select a bucket</option>
              {buckets.map((bucket) => (
                <option className="option-box"key={bucket.name} value={bucket.name}>
                  {bucket.name}
                </option>
              ))}
            </select>
          </label >
          <button type="submit" className="card-button">
            Add Card
          </button>
        </div>
      </form>
      <div className="buc">
      <h2>Add a <span className="Add-card">Bucket</span></h2>
      <form onSubmit={addBucket}>
        <label>
        <span className="Add-card">Bucket</span> Name:
          <input
          className="input-box"
            required='true'
            type="text"
            value={newBucketName}
            onChange={(event) => setNewBucketName(event.target.value)}
            placeholder="Enter Bucket Name"
          />
        </label>
        <button type="submit" className="buc-button">Add Bucket</button>
      </form>
      </div>
      </div>
     <div className="played-buckets">
      <div>
      <h2 className="tab">Buckets</h2>
      <div className="Buckets">
      <ul >
        {buckets.map((bucket) => (
          <li className="bucket-list" key={bucket.name}>
            <div className="bucket-details">
            <h3>{bucket.name}</h3>
            
            </div>
            <button className="selected-delete" onClick={() => deleteCards()}>Delete Selected Cards</button>
            <ul className="bucket-align">
             
              {bucket.cards.map((card, index) => (
                <div className="bucket-card-data">
                  <li
                    key={`bucket-${index}`}
                    //key={card.name}
                  >
                    <div onClick={() => toggleModal(card)}>
                      <p className="card-title">{card.name}</p>
                      <p className="card-link">{card.link}</p>
                    </div>
                    {/* <label>
                      <input
                        type="checkbox"
                        checked={card.selected}
                        onChange={(event) => {
                          const updatedBuckets = [...buckets];
                          const bucketIndex = updatedBuckets.findIndex(
                            (bucket) => bucket.name === selectedBucket
                          );
                          const updatedCards = [
                            ...updatedBuckets[bucketIndex].cards,
                          ];
                          const cardIndex = updatedCards.findIndex(
                            (c) => c.name === card.name && c.link === card.link
                          );
                          updatedCards[cardIndex].selected =
                            event.target.checked;
                          updatedBuckets[bucketIndex].cards = updatedCards;
                          setBuckets(updatedBuckets);
                        }}
                      />
                      Select
                    </label> */}
                    <div>
                      <label>
                        Move to:
                        <select 
                          onChange={(event) =>
                            moveCard(card, event.target.value)
                          }
                        >
                          <option value="">Select a bucket</option>
                          {buckets.map((bucket) => (
                            <option key={bucket.name} value={bucket.name}>
                              {bucket.name}
                            </option>
                          ))}
                        </select>
                      </label>
                      <button onClick={() => deleteCard(card)}>Delete</button>
                    </div>
                  </li>
                </div>
              ))}
               {bucket.cards.length===0?
        <div className="no-videos">NO videos added..</div>:null}
              

            </ul>
            
          </li>
        ))}
      </ul>
      </div>

      
      </div>
      <div className="history-tab">
      <h2 className="tab">Played Videos</h2>
      <ul className="bucket-align">
        {playedVideos && playedVideos.map((playedVideo) => (
          <div className="bucket-list" >
          <li key={playedVideo.time}>
            <p>Name: {playedVideo.name}</p>
            <p>Link: {playedVideo.link}</p>
            <p>Time: {playedVideo.time}</p>
          </li></div>
        ))}
        {playedVideos.length===0?
        <div className="bucket-list">NO videos played Recently..</div>:null}
      </ul>
      </div>
      </div>
      </div>

      
     

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <iframe src={playedVideos[playedVideos.length - 1].link}></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;