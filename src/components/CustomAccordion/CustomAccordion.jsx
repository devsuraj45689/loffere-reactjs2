import './CustomAccordion.css';
import './CustomAccordion.css';
import React, { useState } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import { Plus, Minus } from 'lucide-react'; // Importing Lucide icons
import 'bootstrap/dist/css/bootstrap.min.css';

// Component to render nested list items with their own item count
const NestedItem = ({ title, itemCount, nestedItems }) => {
  const subitems = [
    { title: 'Sofa', count: 20 },
    { title: 'Chair', count: 20 },
  ];

  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle the expansion state when clicking the title
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div className="nested-item">
      {/* Title and expand/collapse button */}
      <div
        style={{ display: 'flex', alignItems: 'center' }}
        onClick={toggleExpanded}
      >
        <Button variant="link" style={{ padding: 0, marginRight: '10px' }}>
          {isExpanded ? (
            <Minus size={16} color="grey" />
          ) : (
            <Plus size={16} color="grey" />
          )}
        </Button>
        <span>{title}</span>
        <span
          style={{
            marginLeft: 'auto',
            color: '#888',
            fontWeight: '300',
            fontFamily: 'Poppins-Light',
            fontSize: '14px',
          }}
        >
          ({itemCount})
        </span>
      </div>

      {/* Show nested items if expanded */}
      {isExpanded && (
        <ul style={{ marginLeft: '10px' }}>
          {subitems.map((item, index) => (
            <li
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '5px',
              }}
            >
              <span>{item.title}</span>
              <span
                style={{
                  color: '#888',
                  fontWeight: '300',
                  fontFamily: 'Poppins-Light',
                  fontSize: '14px',
                }}
              >
                ({item.count})
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ExpansionPanelItem = ({ title, itemCount, children, eventKey }) => {
  return (
    <Accordion.Item eventKey={eventKey} className="accordion-item">
      <Accordion.Header>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <span>{title}</span>
          {itemCount ? (
            <span style={{ marginLeft: 'auto', color: '#888' }}>
              ({itemCount})
            </span>
          ) : (
            ''
          )}
        </div>
      </Accordion.Header>
      <Accordion.Body>
        <div style={{ marginLeft: '20px' }}>{children}</div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

const ExpansionPanel = () => {
  return (
    <Accordion defaultActiveKey="0">
      <ExpansionPanelItem title="Category" eventKey="0">
        {/* Nested non-accordion items */}
        <div>
          <NestedItem title="Home appliances" itemCount={3} />
          <NestedItem title="Furniture Products" itemCount={2} />
          <NestedItem title="Vehicles" itemCount={4} />
        </div>
      </ExpansionPanelItem>

      <ExpansionPanelItem title="Location" eventKey="1">
        {/* Nested non-accordion items */}
        <div>
          <NestedItem title="Item 2.1" itemCount={1} />
          <NestedItem title="Item 2.2" itemCount={2} />
          <NestedItem title="Item 2.3" itemCount={3} />
        </div>
      </ExpansionPanelItem>

      <ExpansionPanelItem title="Budget" eventKey="2">
        {/* Nested non-accordion items */}
        <div>
          <NestedItem title="Item 3.1" itemCount={5} />
          <NestedItem title="Item 3.2" itemCount={3} />
          <NestedItem title="Item 3.3" itemCount={4} />
          <NestedItem title="Item 3.4" itemCount={2} />
          <NestedItem title="Item 3.5" itemCount={1} />
          <NestedItem title="Item 3.6" itemCount={6} />
          <NestedItem title="Item 3.7" itemCount={0} />
        </div>
      </ExpansionPanelItem>
    </Accordion>
  );
};

export default ExpansionPanel;
