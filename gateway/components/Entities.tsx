import Typography from '@material-ui/core/Typography';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
import React from 'react';
import { QueryHandlerEntity } from '../graphql/generated-queryHandler';
import Entity from './Entity';

const Entities: React.FC<{ entities?: QueryHandlerEntity[] }> = ({ entities }) => {
  return (
    <>
      {entities && !isEqual(entities, []) ? (
        entities
          .map((entity) =>
            pick(entity, 'id', 'entityName', 'tag', 'desc', 'created', 'lastModified', 'value')
          )
          .map((entity) => {
            let value;
            try {
              value = JSON.parse(entity.value);
            } catch (err) {
              value = { error: 'fail to parse value' };
            }

            return {
              ...entity,
              value,
              created: new Date(entity?.created * 1000).toString().split('GMT')[0],
              lastModified: new Date(entity?.lastModified * 1000).toString().split('GMT')[0],
            };
          })
          .map((entity) => <Entity key={entity.id} entity={entity} />)
      ) : (
        <p>No data returned</p>
      )}
    </>
  );
};

export default Entities;
