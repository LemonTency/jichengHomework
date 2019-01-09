report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "..\\..\\..\\backstop_data\\bitmaps_reference\\backstop_default_qqmap_0_document_0_phone.png",
        "test": "..\\..\\..\\backstop_data\\bitmaps_test\\20190109-150125\\backstop_default_qqmap_0_document_0_phone.png",
        "selector": "document",
        "fileName": "backstop_default_qqmap_0_document_0_phone.png",
        "label": "qqmap",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "https://map.qq.com/m/",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "phone",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "4.22",
          "analysisTime": 47
        },
        "diffImage": "..\\..\\..\\backstop_data\\bitmaps_test\\20190109-150125\\failed_diff_backstop_default_qqmap_0_document_0_phone.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "..\\..\\..\\backstop_data\\bitmaps_reference\\backstop_default_qqmap_0_document_1_tablet.png",
        "test": "..\\..\\..\\backstop_data\\bitmaps_test\\20190109-150125\\backstop_default_qqmap_0_document_1_tablet.png",
        "selector": "document",
        "fileName": "backstop_default_qqmap_0_document_1_tablet.png",
        "label": "qqmap",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "https://map.qq.com/m/",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "tablet",
        "error": "Reference file not found C:\\document\\frontEnd\\京城一灯\\note\\前端与测试\\yideng-test\\backstop_data\\bitmaps_reference\\backstop_default_qqmap_0_document_1_tablet.png"
      },
      "status": "fail"
    }
  ],
  "id": "backstop_default"
});