import React from 'react';


const useBoolean = ():[
    showModal:boolean,
    onShowModal:()=>void,
    onHideModal:()=>void ,
] =>
    {
    const [showModal,setShowModal] = React.useState<boolean>(false)
    const onShowModal =React.useCallback(()=>{
        setShowModal(true);
    },[])
    const onHideModal =React.useCallback(()=>{
        setShowModal(false);
    },[])
    return [showModal,onShowModal,onHideModal]
}
export default useBoolean