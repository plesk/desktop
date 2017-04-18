import React from 'react';

const addExternalProps = ({ href, ...props }) => {
  const electron = window.require && window.require('electron');
  if (electron) {
    return {
      ...props,
      href: '#',
      onClick: event => {
        event.preventDefault();
        electron.shell.openExternal(href);
      },
    }
  }

  return {
    ...props,
    href,
    target: '_blank',
  }
};

const ExternalLink = props => (
  <a {...addExternalProps(props)} />
);

export default ExternalLink;
