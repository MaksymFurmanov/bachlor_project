import {IoMdTrash} from "react-icons/io";
import {useEffect, useRef, useState} from "react";
import departments from "../../data/departments";

const ProductionProcessDetails = ({
                                      process,
                                      inputHandler,
                                      deleteHandler,
                                      closeHandler,
                                      coordinates
                                  }) => {
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0
    });

    //setting coordinates to show details box
    const [x, y] = coordinates;
    useEffect(() => {
        if (containerRef.current) {
            const {offsetWidth, offsetHeight} = containerRef.current;
            setDimensions({width: offsetWidth, height: offsetHeight});
        }
    }, []);
    const {width: detailsWidth, height: detailsHeight} = dimensions;
    const positionX = x - detailsWidth / 2;
    const positionY = y - detailsHeight;

    const departmentsOptions =
        departments.map((department, index) => {
            return <option value={department.department_id} key={index}>
                {department.name}
            </option>
        })


    //close details box whenever a user click outside the box
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                closeHandler();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeHandler]);

    return <div className={"ProductionProcessDetails white-outline"}
                style={{
                    left: positionX + "px",
                    top: positionY + "px"
                }}
                ref={containerRef}>
        <div>
            <label>Oddelenie:</label>
            <select name={"department_id"}
                    value={process.department_id}
                    onChange={inputHandler}>
                <option value={-1}></option>
                {departmentsOptions}
            </select>
        </div>
        <div>
            <label>Kedy vykonané:</label>
            <input name={"done_name"}
                   value={process.done_name}
                   onChange={inputHandler}/>
        </div>
        <button onClick={deleteHandler}>
            <IoMdTrash/>
        </button>
    </div>
};

export default ProductionProcessDetails