function buildTemplate() {
    var htmlFile = document.getElementById("htmlFile").files[0];
    var cssFile = document.getElementById("cssFile").files[0];

    if (!htmlFile || !cssFile) {
        document.getElementById("status").innerText = "Please upload both HTML and CSS files.";
        return;
    }

    var instanceType = document.getElementById("instanceType").value;
    var storageSize = document.getElementById("storageSize").value;
    var securityGroup = document.getElementById("securityGroup").value;
    var vpc = document.getElementById("vpc").value;
    var subnet = document.getElementById("subnet").value;
    var database = document.getElementById("database").value;
    var scaling = document.getElementById("scaling").value;

    // Construct the YAML CloudFormation template
    var yamlTemplate = `AWSTemplateFormatVersion: '2010-09-09'
Description: CloudFormation Template for deploying website
Resources:
  WebsiteInstance:
    Type: AWS::EC2::Instance
    Properties:
      InstanceType: ${instanceType}
      # Add more instance properties as needed
  StorageVolume:
    Type: AWS::EC2::Volume
    Properties:
      Size: ${storageSize}
      # Add more volume properties as needed
  SecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: ${securityGroup}
      # Add more security group properties as needed
  # Add more resources based on user inputs
`;

    // Convert the YAML template to a Blob
    var blob = new Blob([yamlTemplate], { type: 'text/yaml' });

    // Create a link element to download the YAML file
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'cloudformation-template.yaml';

    // Trigger a click event on the link to initiate the download
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    document.getElementById("status").innerText = "CloudFormation template downloaded successfully.";
}
