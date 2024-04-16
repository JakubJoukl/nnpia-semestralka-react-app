import React from "react";
import MyAlert from "./MyAlert";

class MyErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  handleMessage(message: string) {
    try {
      let decodedMessage = JSON.parse(message);
      const values = Object.values(decodedMessage);
      const messages = values.join(", ");
      return messages;
    } catch (e) {
      console.log("Nebyl to json: " + e);
      return message;
    }
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <>
          <MyAlert>{this.handleMessage(this.state.error.toString())}</MyAlert>
          {this.props.children}
        </>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default MyErrorBoundary;
