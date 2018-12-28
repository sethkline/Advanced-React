import SingleGraphic from '../components/SingleGraphic';




const Graphic = props => (
    <div>
        <SingleGraphic id={props.query.id} />
    </div>
)

export default Graphic;