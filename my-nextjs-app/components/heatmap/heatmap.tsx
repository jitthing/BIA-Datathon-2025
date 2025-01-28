import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface RelationshipData {
  subject: string;
  predicate: string;
  object: string;
}

const RelationshipHeatmap = () => {
  // Sample data transformed from the provided triplets
  const data: RelationshipData[] = [
    { subject: "Pristina Airport", predicate: "location", object: "Pristina" },
    { subject: "Kosovo", predicate: "capital", object: "Pristina" },
    { subject: "Pristina", predicate: "country", object: "Kosovo" },
    { subject: "Pristina", predicate: "twinned administrative body", object: "Ljubljana" },
    { subject: "KOCB", predicate: "headquarters location", object: "Pristina" },
    { subject: "ITF", predicate: "facet of", object: "UNMIK" },
    { subject: "International Prosecutor, UNMIK Department of Justice", predicate: "significant place", object: "Kosovo" },
    { subject: "PEAP", predicate: "organizer", object: "The ITF" },
    { subject: "Kosovo", predicate: "executive body", object: "DOTI" },
    { subject: "DOTI", predicate: "country", object: "Kosovo" }
  ];

  // Get unique entities (subjects and objects)
  const entities = Array.from(new Set([
    ...data.map(d => d.subject),
    ...data.map(d => d.object)
  ])).sort();

  // Create adjacency matrix
  const matrix = entities.map(entity1 => 
    entities.map(entity2 => {
      const relationships = data.filter(
        d => (d.subject === entity1 && d.object === entity2) ||
             (d.subject === entity2 && d.object === entity1)
      );
      return relationships.length;
    })
  );

  // Get maximum relationship count for color scaling
  const maxValue = Math.max(...matrix.flat());

  // Function to get color intensity based on relationship count
  const getColor = (value: number) => {
    const intensity = value === 0 ? 255 : Math.floor(255 - (value / maxValue) * 200);
    return `rgb(${intensity}, ${intensity}, 255)`;
  };

  return (
    <Card className="w-full max-w-6xl overflow-x-auto">
      <CardHeader>
        <CardTitle>Entity Relationship Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="min-w-max">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="p-2 border"></th>
                {entities.map(entity => (
                  <th 
                    key={entity}
                    className="p-2 border transform -rotate-45 origin-left whitespace-nowrap"
                  >
                    {entity}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entities.map((entity1, i) => (
                <tr key={entity1}>
                  <th className="p-2 border text-left whitespace-nowrap">
                    {entity1}
                  </th>
                  {entities.map((entity2, j) => (
                    <td
                      key={`${entity1}-${entity2}`}
                      className="w-12 h-12 border text-center"
                      style={{
                        backgroundColor: getColor(matrix[i][j]),
                        color: matrix[i][j] > 0 ? 'white' : 'black'
                      }}
                    >
                      {matrix[i][j] || ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RelationshipHeatmap;