import { forwardRef, useImperativeHandle ,useRef} from "react";
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
    return <dialog ref={dialog} className="result-modal">
       {userLost && <h2>User Lost</h2>} 
       {!userLost && <h2>User Won: Your score {score}</h2>}
        <p>The Target Timer was <strong>{targetTime} seconds.</strong></p>
        <p>You stopped the timer with <strong>{formatRemainingTime} seconds left.</strong></p>
        <form method="dialog" onSubmit={onReset}>
            <button>Close</button>
        </form>
    </dialog>;
})

export default ResultModal;