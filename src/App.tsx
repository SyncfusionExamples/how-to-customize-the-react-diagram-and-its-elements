import './App.css';
import { DiagramComponent, 
  NodeModel, 
  ConnectorModel, 
  PageSettingsModel,
  SnapConstraints,
  ConnectorBridging,
  Inject,
  DiagramConstraints
} from '@syncfusion/ej2-react-diagrams';
function App() {
  const nodes : NodeModel[] = [
    {
      id: "startNode",
      offsetX: 300,
      offsetY: 60,
      height: 60,
      width: 150,
      shape: { type: "Flow", shape: "Terminator" },
      annotations: [{ content: 'Start'}]
    },
    {
      id: "inputNode",
      offsetX: 300,
      offsetY: 180,
      height: 60,
      width: 150,
      shape: { type: "Flow", shape: "Data" },
      annotations: [{ content: 'Enter a number'}]
    },
    {
      id: "decisionNode",
      offsetX: 300,
      offsetY: 300,
      height: 60,
      width: 150,
      shape: { type: "Flow", shape: "Decision" },
      annotations: [{ content: 'N divisible by 2 ?'}]
    },
    {
      id: "processEvenNode",
      offsetX: 600,
      offsetY: 300,
      height: 60,
      width: 150,
      shape: { type: "Flow", shape: "Process" },
      annotations: [{ content: 'N is Even'}]
    },
    {
      id: "processOddNode",
      offsetX: 300,
      offsetY: 420,
      height: 60,
      width: 150,
      shape: { type: "Flow", shape: "Process" },
      annotations: [{ content: 'N is Odd'}]
    },
    {
      id: "endNode",
      offsetX: 300,
      offsetY: 540,
      height: 60,
      width: 150,
      shape: { type: "Flow", shape: "Terminator" },
      annotations: [{ content: 'End' }]
    }
  ];
  
  const connectors : ConnectorModel[] = [
    {
      id: 'startToInputConnector',
      sourceID: 'startNode',
      targetID: 'inputNode'
    },
    {
      id: 'inputToDecisionConnector',
      sourceID: 'inputNode',
      targetID: 'decisionNode'
    },
    {
      id: 'decisionToProcessEvenConnector',
      sourceID: 'decisionNode',
      targetID: 'processEvenNode',
      annotations: [{ content: 'true', alignment: 'Before', displacement: { x: 3, y: 3 } }]
    },
    {
      id: 'decisionToProcessOddConnector',
      sourceID: 'decisionNode',
      targetID: 'processOddNode',
      annotations: [{ content: 'false', alignment: 'After', displacement: { x: 5, y: 5 } }]
    },
    {
      id: 'processOddToEndConnector',
      sourceID: 'processOddNode',
      targetID: 'endNode'
    },
    {
      id: 'processEvenToEndConnector',
      sourceID: 'processEvenNode',
      targetID: 'endNode',
      type: "Orthogonal",
      segments: [{ type: "Orthogonal", direction: "Bottom", length: 200 }]
    }
  ];

  const pageSetting : PageSettingsModel= {
    height: 842, width: 595,
    showPageBreaks: true,
    margin: {top: 20, bottom: 20, left: 20, right: 20},
    background: { color: '#CEF6F5'},
    orientation: 'Portrait',
    multiplePage: true
  }

  const snapSettings = {
    constraints: SnapConstraints.None
  }

  /**
   * 
   * @param node 
   * @returns 
   */
  const nodeDefaults =( node: NodeModel) =>{
    node.style = {
      fill: 'LightGreen', strokeColor: 'Orange',
      strokeWidth: 3, strokeDashArray: '7,7',
      gradient: {
        type: 'Radial',
        x1: 0, y1: 0,
        x2: 200, y2: 200,
        stops: [
          { color: 'white', offset: 0},
          { color: '#6BA5D7', offset: 500}
        ]
      }
    }
    //node.pivot = { x: 0, y: 0};
    return node;
  }

  /**
   * 
   * @param connector 
   * @returns 
   */
  const connectorDefaults = ( connector: ConnectorModel) =>{
    connector.style = {
      strokeColor: 'Blue',
    };
    connector.sourceDecorator = { shape: 'Diamond',
      style: {
        fill: 'Yellow', strokeColor: 'Blue',
        strokeWidth: 2
      }
     };
     connector.targetDecorator = { shape: 'IndentedArrow'};
     connector.hitPadding = 50;
     connector.targetPadding = 5;
     connector.sourcePadding = 5;
     return connector;
  }
  return (
    <div className="container">
      <DiagramComponent 
        width={'902px'}
        height={'602px'}
        nodes={nodes}
        //pageSettings={pageSetting}
        connectors={connectors}
        snapSettings={snapSettings}
        getNodeDefaults={nodeDefaults}
        getConnectorDefaults={connectorDefaults}
        constraints={DiagramConstraints.Default | DiagramConstraints.Bridging}
        bridgeDirection='Right'
      >
        <Inject services={[ConnectorBridging]} />
      </DiagramComponent>
    </div>
  );
}

export default App;
