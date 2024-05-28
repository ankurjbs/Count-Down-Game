import { forwardRef, useImperativeHandle ,useRef} from "react";
import { createPortal } from "react-dom"; // for ineration with DOM. Purpose of this to render the ResultComponenet to another place in DOM

// since modal(ResultModal) is nested somewhere in the dom because I am using this in timechallenge jss. But technicall this should be reside on top of the element . purpose to styling or for something else so we use portals. In one line Portal is used to put a JSX component to other place instead of root


// we can't use ref props directly to the function. if we want to pass one ref to another we used to special type of hooks forwardRef
const ResultModal =  forwardRef(function ResultModal({onReset,targetTime,remainingTime},ref){
    const dialog = useRef();
    const userLost = remainingTime <=0;
    const formatRemainingTime = (remainingTime/1000).toFixed(2);
    const score = Math.round((1- remainingTime/(targetTime*1000)) *100);


    // to use following hook we have to use use beacuse we now need seperatre ref to detach dialof ref from other outer component(TimerChallenge)
    useImperativeHandle(ref,()=>{
        return{
            open(){
                dialog.current.showModal();
            }
        }
    });


    // return <dialog ref={ref} className="result-modal">
    // use createPortal to Teleport accept to parameters . One is JSX, and 2nd where code should be rendered
    return createPortal(<dialog ref={dialog} className="result-modal">
       {userLost && <h2>User Lost</h2>} 
       {!userLost && <h2>User Won: Your score {score}</h2>}
        <p>The Target Timer was <strong>{targetTime} seconds.</strong></p>
        <p>You stopped the timer with <strong>{formatRemainingTime} seconds left.</strong></p>
        <form method="dialog" onSubmit={onReset}>
            <button>Close</button>
        </form>
    </dialog>,document.getElementById('modal'));
    // this modal id is in index.html
})

export default ResultModal;