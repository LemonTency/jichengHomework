<template>
  <div class="orderlist">
    <template>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="dialogVisible = true">新增</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
             <el-button icon="el-icon-search" circle @click="handleDetail(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="添加人员" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="添加时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.date"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="人员姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="家庭住址">
            <el-input type="textarea" v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即添加</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </template>
  </div>
</template>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "OrderList",
  computed: mapState(["isSuccess"]),
  watch: {
    isSuccess: function(val, oldVal) {
      if (val) {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.initData();
      }
    }
  },
  created() {
    //初始化数据
    this.initData();
  },
  methods: {
    ...mapActions(["removeTodo"]),
    handleDetail(index, row){
      // alert(row.uid);
      //this.$router.push({path:'xxx',params:{aa:xx, bb: xx}}); 
      this.$router.push({path:'/zgjs/orderdetail',query:{uid:row.uid}});   
    },
    onSubmit() {
      alert(this.form.date);
      console.log("submit!");
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.removeTodo(row.uid);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    initData() {
      const me = this;
      //mockjs 模拟数据
      this.$axios
        .get("/api/data")
        .then(function(response) {
          console.log(response);
          me.tableData = response.data.result;
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .finally(function() {
          me.loading = false;
        });
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    }
  },
  data() {
    return {
      tableData: [],
      loading: true,
      dialogVisible: false,
      form: {
        name: "",
        address: "",
        date: ""
      }
    };
  }
};
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
