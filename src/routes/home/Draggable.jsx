import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card } from 'antd';
import classNames from 'classnames';
import styles from './style.less';

import Pie from './charts/Pie';
import Bar from './charts/Bar';
import Line from './charts/Line';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

export default class AppDraggable extends React.PureComponent {
    state = {
        items: [],
        selected: []
    };
    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        droppable: 'items',
        droppable2: 'selected'
    };
	
    componentWillReceiveProps(nextProps) {
        if (nextProps.data) {
            this.setState({ items: nextProps.data });
        }
    }
    getList = id => this.state[this.id2List[id]];

    handleOnDragEnd = result => {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(this.getList(source.droppableId), source.index, destination.index);

            let state = { items };

            if (source.droppableId === 'droppable2') {
                state = { selected: items };
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );
            this.setState({
                items: result.droppable,
                selected: result.droppable2
            });
        }
    };
    renderChartComponent(item) {
        const { component } = item;
        let cmp = null;
        switch (component) {
            case 'bar':
                cmp = <Bar type={component} />;
                break;
            case 'pie':
                cmp = <Pie type={component} />;
                break;
            default:
                cmp = <Line type={component} />;
                break;
        }
        return cmp;
    }
    renderDraggableItem(provided, snapshot, item, left) {
        return (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={classNames(styles.item, {
                    [styles['item-dragging']]: snapshot.isDragging
                })}
                style={provided.draggableProps.style}
            >
                {left ? item.name : this.renderChartComponent(item)}
            </div>
        );
    }
    getItemDroppableCls(snapshot) {
        return classNames({
            [styles['drag-list']]: true,
            [styles['drag-list-dragging']]: snapshot.isDraggingOver
        });
    }
    render() {
        return (
            <div className={styles['drag-container']}>
                <DragDropContext onDragEnd={this.handleOnDragEnd}>
                    <Card title="Components" className={styles['left-container']}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div ref={provided.innerRef} className={this.getItemDroppableCls(snapshot)}>
                                    {this.state.items.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided, snapshot) =>
                                                this.renderDraggableItem(provided, snapshot, item, 'left')
                                            }
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </Card>
                    <Card title="Preview" className={styles['right-container']}>
                        <Droppable droppableId="droppable2">
                            {(provided, snapshot) => (
                                <div ref={provided.innerRef} className={this.getItemDroppableCls(snapshot, 'right')}>
                                    {this.state.selected.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided, snapshot) => this.renderDraggableItem(provided, snapshot, item)}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </Card>
                </DragDropContext>
            </div>
        );
    }
}
