import {PieChart} from "@mui/x-charts";

const OrdersGraph = ({items, type}) => {
    let data = [], pieArcLabelClasses = [], size = 0;
    if (type === "products_to_product") {
        items.forEach((order) => {
            const label = `${order.product.name} ${order.product.type}`;

            data.push({label: label, value: order.volume});
            pieArcLabelClasses.push(label);
            size += order.volume;
        });
    } else if (type === "raw_materials") {
        items.forEach((material) => {
            const label = material.name;

            data.push({label: label, value: material.volume});
            pieArcLabelClasses.push(label);
            size += material.volume;
        });
    }

    return <div className={"OrdersGraph"}>
        <PieChart
            series={[
                {
                    arcLabel: (item) => `${item.label} (${item.value})`,
                    arcLabelMinAngle: 45,
                    data,
                },
            ]}
            sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                    fill: 'white',
                    fontWeight: 'bold',
                },
            }}
            slotProps={{
                legend: {
                    direction: 'column',
                    position: { vertical: 'bottom', horizontal: 'center' },
                    padding: 0,
                },
            }}
            {...size}
        />
    </div>
}

export default OrdersGraph
