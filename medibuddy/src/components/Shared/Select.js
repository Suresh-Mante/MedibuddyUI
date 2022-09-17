const Select = (props) => {
    return (
        <>
            <select className="form-control" onChange={(event) => {
                props.onChange(event.target.value);
            }}>
                <option>Select {props.name}</option>
                {
                    props.dataSource != null &&
                    props.dataSource.map((item, index) => (
                        <option key={index} value={item} 
                        selected={props.defaultValue && props.defaultValue == item ?
                        true: false}>{item}</option>
                    ))
                }
            </select>
        </>
    );
}

export default Select;