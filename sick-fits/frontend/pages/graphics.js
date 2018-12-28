import GraphicsList from '../components/graphics/GraphicsList';

const graphicsPage = props => (
    <div>

        <GraphicsList page={parseFloat(props.query.page) || 1} />

    </div>
);

export default graphicsPage;